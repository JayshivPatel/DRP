-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('UNSEEN', 'SEEN');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "status" "AppointmentStatus" NOT NULL DEFAULT 'UNSEEN';
