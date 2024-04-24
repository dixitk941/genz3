const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { firestore } = require("firebase-admin");

admin.initializeApp();

exports.onMessageCreate = functions.firestore
    .document('messages/{userId}')
    .onCreate((snap, context) => {
        const ref = admin.firestore().collection('messages').orderBy('timestamp');

        ref.onSnapshot(snapshot => {
            i = 0;
            size = snapshot.size;
            sizeToDelete = size - 10;
            console.log('Messages Count: ' + size);

            snapshot.forEach((doc) => {
                if (i < sizeToDelete) {
                    doc.ref.delete().then(() => {
                        console.log("Document deleted successfully");
                    }).catch((error) => {
                        console.log("Error removing document: " + error);
                    });
                }
                i++;
            });
        });
    });

exports.createLectures = functions.https.onCall((data,context) => {
    return admin.firestore().collection('LiveLectures')
    .add({
        LectureName:data.LectureName,
        ProfessorName:data.ProfessorName,
        StudentName:data.StudentName,
        ScheduledDate:data.ScheduledDate,
        ScheduledTime:data.ScheduledTime,
        timestamp:data.timestamp,
    });
});





exports.getLectures = functions.https.onCall((data, context) => {
  
  var getlist = admin.firestore().collection('LiveLectures').orderBy('timestamp');
  return getlist
    .get()
    .then(querySnapshot => {
        let list = [];
      querySnapshot.forEach(doc => {
        list.push({...doc.data()});
      });
      return list;
    })
    .catch(err => {
      console.log("Error getting document:", err);
    });
});

exports.getStudents = functions.https.onCall((data, context) => {
  var list = [];
  var getlist = admin.firestore().collection('Students');
  return getlist
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        list.push(doc.data().name);
      });
      return list;
    })
    .catch(err => {
      console.log("Error getting document:", err);
    });
});