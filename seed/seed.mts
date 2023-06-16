import fs from "node:fs/promises";
import { randomInt } from "node:crypto";
import { PrismaClient, Prisma, Patient } from "@prisma/client";

const prisma = new PrismaClient();

async function loadNames(filename: string): Promise<string[]> {
  const contents = await fs.readFile(filename, { encoding: "utf-8" });
  const { data } = JSON.parse(contents);
  return data;
}

const firstNames = await loadNames("names-first.json");
const lastNames = await loadNames("names-surnames.json");

function makeDate(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day));
}

function makeTime(hour: number, minute: number): Date {
  if (hour < 0 || hour > 23) {
    throw new RangeError("Hour must be between 0 and 23");
  }
  if (minute < 0 || minute > 59) {
    throw new RangeError("Minute must be between 0 and 59");
  }
  return new Date(Date.UTC(1970, 0, 1, hour, minute));
}

const START_TIME = makeTime(8, 0);
const END_TIME = makeTime(19, 0);
const SLOT_MILLIS = 5 * 60 * 1000;
const MAX_SLOTS = 6;

const REASONS = [
  "Persistent cough",
  "Chest pains",
  "Persistent joint pains",
  "Abdominal pains",
];

type Chunk = {
  offset: number;
  length: number;
};

class BitSet {
  data: Uint8Array;
  length: number;

  constructor(length: number) {
    this.data = new Uint8Array(Math.ceil(length / 8) * 8);
    this.length = length;
  }

  private byteIndex(index: number): number {
    if (index < 0 || index >= this.length) {
      throw new RangeError("Index out of bounds");
    }
    return Math.floor(index / 8);
  }

  private byteMask(index: number): number {
    return 1 << index % 8;
  }

  get(index: number): boolean | undefined {
    const value = this.data[this.byteIndex(index)] & this.byteMask(index);
    return !!value;
  }

  set(index: number, value: boolean) {
    const byteIndex = this.byteIndex(index);
    const byteMask = this.byteMask(index);
    if (value) {
      this.data[byteIndex] |= byteMask;
    } else {
      this.data[byteIndex] &= ~byteMask;
    }
  }

  setChunk(chunk: Chunk, value: boolean) {
    for (let i = 0; i < chunk.length; i++) {
      this.set(chunk.offset + i, value);
    }
  }

  chunks(value: boolean): Chunk[] {
    const chunks: Chunk[] = [];

    let chunk: Chunk | undefined;
    for (let i = 0; i < this.length; i++) {
      if (this.get(i) == value) {
        if (!chunk) chunk = { offset: i, length: 0 };
        chunk.length++;
      } else if (chunk) {
        chunks.push(chunk);
        chunk = undefined;
      }
    }
    if (chunk) chunks.push(chunk);

    return chunks;
  }
}

function randomChoice<T>(items: T[]): T {
  return items[randomInt(items.length)];
}

function randomFirstName() {
  return randomChoice(firstNames);
}

function randomLastName() {
  return randomChoice(lastNames);
}

function slotToTime(index: number): Date {
  return new Date(START_TIME.getTime() + index * SLOT_MILLIS);
}

function timeToSlot(time: Date): number {
  return Math.floor((time.getTime() - START_TIME.getTime()) / SLOT_MILLIS);
}

function randomClinic(date: Date): Prisma.ClinicCreateInput {
  return {
    title: `Dr ${randomLastName()}`,
    date,
  };
}

function randomAppointments(
  clinicId: number,
  patientIds: number[],
  maxAppointments: number
): Prisma.AppointmentCreateManyInput[] {
  const bits = new BitSet(timeToSlot(END_TIME));
  const appointments: Prisma.AppointmentCreateManyInput[] = [];

  for (let i = 0; i < maxAppointments; i++) {
    const gaps = bits.chunks(false);
    if (gaps.length === 0) break;

    let length = 0;
    let possibleGaps: Chunk[] = [];
    while (possibleGaps.length === 0) {
      length = randomInt(1, MAX_SLOTS + 1);
      possibleGaps = gaps.filter((gap) => gap.length >= length);
    }

    const gap = randomChoice(possibleGaps);
    const offset = gap.offset + randomInt(gap.length - length + 1);

    appointments.push({
      startTime: slotToTime(offset),
      endTime: slotToTime(offset + length),
      notes: randomChoice(REASONS),
      clinicId: clinicId,
      patientId: randomChoice(patientIds),
    });

    bits.setChunk({ offset, length }, true);
  }

  return appointments;
}

const defaultPatients: Pick<
  Patient,
  "firstName" | "lastName" | "dateOfBirth"
>[] = [
  {
    firstName: "Mickey",
    lastName: "Mouse",
    dateOfBirth: makeDate(2009, 2, 23),
  },
  {
    firstName: "Minnie",
    lastName: "Mouse",
    dateOfBirth: makeDate(2009, 3, 29),
  },
  {
    firstName: "John",
    lastName: "Smith",
    dateOfBirth: makeDate(2000, 1, 1),
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    dateOfBirth: makeDate(2000, 1, 1),
  },
];

const existing = await prisma.patient.findMany({
  where: {
    OR: defaultPatients,
  },
});

const newPatients: Prisma.PatientCreateManyInput[] = defaultPatients
  .filter(
    (a) =>
      !existing.some(
        (b) =>
          a.firstName == b.firstName &&
          a.lastName == b.lastName &&
          a.dateOfBirth.getTime() == b.dateOfBirth.getTime()
      )
  )
  .map((patient) => ({
    ...patient,
    nhsNumber: randomInt(1e9, 1e10).toString(),
    phoneNumber: "+447770160480",
  }));

let label = `Creating ${newPatients.length} patients`;
console.time(label);
await prisma.patient.createMany({ data: newPatients });
console.timeEnd(label);

const date = makeDate(2023, 6, 16);

label = "Fetching patients";
console.time(label);
const patients = await prisma.patient.findMany();
console.timeEnd(label);

const patientIds = patients.map(({ id }) => id);

for (let i = 0; i < 1; i++) {
  label = "Creating clinic";
  console.time(label);
  const clinic = await prisma.clinic.create({ data: randomClinic(date) });
  console.timeEnd(label);

  label = "Creating appointments";
  console.time(label);
  await prisma.appointment.createMany({
    data: randomAppointments(clinic.id, patientIds, 40),
  });
  console.timeEnd(label);
}
