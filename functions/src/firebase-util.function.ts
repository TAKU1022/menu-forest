import * as admin from 'firebase-admin';

const db = admin.firestore();

function deleteQueryBatch(
  query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>,
  batchSize: number,
  resolve: any,
  reject: any
): void {
  query
    .get()
    .then((snapshot) => {
      if (snapshot.size === 0) {
        return 0;
      }
      const batch = db.batch();
      snapshot.forEach((doc) => batch.delete(doc.ref));
      return batch.commit().then(() => snapshot.size);
    })
    .then((numDeleted) => {
      if (numDeleted === 0) {
        resolve();
        return;
      }
      process.nextTick(() =>
        deleteQueryBatch(query, batchSize, resolve, reject)
      );
    })
    .catch(reject);
}

export function deleteCollectionByReference(
  ref:
    | FirebaseFirestore.Query<FirebaseFirestore.DocumentData>
    | FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
  batchSize: number = 499
): Promise<void> {
  const query = ref.limit(batchSize);
  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, batchSize, resolve, reject);
  });
}
