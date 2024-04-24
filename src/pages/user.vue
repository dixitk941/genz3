<template>
<div class="hat">
<b-table sticky-header="62vh" striped :items="users" thead-class="hidden_header" style="height:63vh;">
</b-table>
</div>
</template>
<script>
import fb from '@/firebase/init';
export default {
    name:'user',
    data() {        
        return {
                users:[],
            }
    },
    created() {
        let ref = fb.collection('messages').orderBy('timestamp');
        ref.onSnapshot(snapshot => {
            snapshot.forEach((doc) => {
                this.users.push({name:doc.data().name});
            });
        });
    }
}
</script>
<style>
.hidden_header {
  display: none;
}

</style>