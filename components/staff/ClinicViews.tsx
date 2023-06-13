import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar, Text } from "react-native-paper";
import { OrderedSet } from "immutable";

import { Clinic, Patient, deleteClinic, useClinics } from "../../lib/api";
import ClinicView from "./ClinicView";

export default function ClinicViews(props: {
  date: string;
  selected: OrderedSet<Clinic["id"]>;
  onChangeSelected: (selected: OrderedSet<Clinic["id"]>) => void;
  patient?: Patient;
  changePatient: () => void;
}) {
  const [deletionFailed, setDeletionFailed] = React.useState(false);

  const { data, mutate } = useClinics({
    date: props.date,
  });

  const clinics = React.useMemo(
    () => new Map(data?.map((clinic) => [clinic.id, clinic])),
    [data]
  );

  function onHidePress(clinic: Clinic) {
    props.onChangeSelected(props.selected.delete(clinic.id));
  }

  function onDelete(clinic: Clinic) {
    deleteClinic(clinic.id)
      .then(() => mutate())
      .catch((e) => {
        console.error(e);
        setDeletionFailed(true);
      });
  }

  /* Maintain selection-order, so the most recently selected is displayed last */
  const selected = props.selected
    .toArray()
    .map((id) => clinics.get(id))
    .filter((clinic): clinic is Clinic => !!clinic);

  return (
    <>
      <View style={styles.row}>
        {selected.length ? (
          selected.map((clinic) => (
            <ClinicView
              key={clinic.id}
              clinic={clinic}
              onDelete={onDelete}
              onHidePress={onHidePress}
              patient={props.patient}
              changePatient={props.changePatient}
            />
          ))
        ) : (
          <Text variant="titleLarge" style={styles.empty}>
            {clinics.size > 0
              ? "No clinics selected. Select or create clinics from the top bar."
              : "No clinics created. Create clinics from the top bar."}
          </Text>
        )}
      </View>
      <Snackbar
        visible={deletionFailed}
        onDismiss={() => setDeletionFailed(false)}
      >
        Failed to delete clinic
      </Snackbar>
    </>
  );
}

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 8,
    gap: 8,
    flex: 1,
  },
  loading: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    flex: 1,
  },
  card: {
    flex: 1,
    padding: 8,
    paddingHorizontal: 16,
    maxHeight: "100%",
  },
  content: {
    flex: 1,
  },
  empty: {
    alignSelf: "center",
    textAlign: "center",
    flex: 1,
  },
});
