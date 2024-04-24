<template>
    <div class="container">
        <form @submit.prevent="createMessage">
            <div class="input-group">
                <input type="text" name="message" class="form-control" placeholder="Enter message ..." v-model="newMessage">
                <p class="text-danger" v-if="errorText">{{ errorText }}</p>
            <span class="input-group-append">
                <button class="btn btn-primary" type="submit" name="action">Submit</button>
            </span>
            </div>
        </form>
    </div>
</template>

<script>
import fb from '@/firebase/init';
export default {
    name: 'CreateMessage',
    props: ['name'],
    data() {
        return {
            newMessage: null,
            errorText: null
        }
    },
    methods: {
        createMessage () {
            if (this.newMessage) {
                fb.collection('messages').add({
                    message: this.newMessage,
                    name: this.name,
                    timestamp: Date.now()
                }).catch((err) => {
                    console.log(err);
                });
                this.newMessage = null;
                this.errorText = null;
            } else {
                this.errorText = "A message must be entered first!";
            }
        }
    }    
}
</script>