import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "./firebaseConfig";

import type { SifonadoTask } from "../types/SifonadoTask";


// --------------------------------------------------
// ESCUCHAR TAREAS DEL USUARIO
// --------------------------------------------------
//
// Solamente trae documentos cuyo userId
// coincide con el usuario logueado.
//

export function subscribeToUserTasks(
  userId: string,
  onTasksChange: (tasks: SifonadoTask[]) => void,
  onError: (error: Error) => void
) {

  const tasksQuery = query(
    collection(db, "tasks"),
    where("userId", "==", userId)
  );


  const unsubscribe = onSnapshot(
    tasksQuery,

    (snapshot) => {

      const tasks: SifonadoTask[] =
        snapshot.docs.map((document) => {

          const data = document.data();

          return {
            id: document.id,

            title: data.title,

            tankRange: data.tankRange,

            description: data.description,

            category: data.category,

            durationMinutes:
              data.durationMinutes,

            // Firestore guarda Timestamp.
            // Nuestra app trabaja con number.
            startedAt: data.startedAt
              ? data.startedAt.toMillis()
              : null,

            completed:
              data.completed ?? false,
          };

        });


      onTasksChange(tasks);

    },

    (error) => {
      onError(error);
    }
  );


  return unsubscribe;
}


// --------------------------------------------------
// CREAR SIFONADO
// --------------------------------------------------

export async function createTaskInFirestore(
  userId: string,
  task: {
    title: string;
    tankRange: string;
    description: string;
    category: string;
    durationMinutes: number;
  }
) {

  await addDoc(
    collection(db, "tasks"),
    {
      ...task,

      userId,

      completed: false,

      startedAt: null,

      completedAt: null,

      createdAt: serverTimestamp(),
    }
  );
}


// --------------------------------------------------
// INICIAR SIFONADO
// --------------------------------------------------

export async function startTaskInFirestore(
  taskId: string
) {

  const taskRef =
    doc(db, "tasks", taskId);


  await updateDoc(taskRef, {
    startedAt: serverTimestamp(),
  });
}


// --------------------------------------------------
// COMPLETAR SIFONADO
// --------------------------------------------------

export async function completeTaskInFirestore(
  taskId: string
) {

  const taskRef =
    doc(db, "tasks", taskId);


  await updateDoc(taskRef, {
    completed: true,
    completedAt: serverTimestamp(),
  });
}


// --------------------------------------------------
// ELIMINAR SIFONADO
// --------------------------------------------------

export async function deleteTaskInFirestore(
  taskId: string
) {

  await deleteDoc(
    doc(db, "tasks", taskId)
  );
}