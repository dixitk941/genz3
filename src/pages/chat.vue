<template>
<div class="hat bg-dark">
  <p class="text-secondary nomessages" v-if="messages.length == 0">
      [No messages yet!]
  </p>
  <ul v-else class="history" v-chat-scroll="{always: false, smooth: true}">
    <div v-for="message in messages" :key="message.id">
      <div v-if="message.name == name">
        <li class="clearfix">
          <div class="message-data align-right">
            <span class="message-data-time">{{message.timestamp}}</span>&nbsp; &nbsp;
            <span class="message-data-name">{{message.name}}</span><i class="fa fa-circle me"></i>
          </div>
          <div class="message my-message float-right">
            {{message.message}}
          </div>
        </li>
      </div>
      <div v-else>
        <li class="clearfix">
          <div class="message-data">
            <span class="message-data-name"><i class="fa fa-circle online"></i>&nbsp; &nbsp;{{message.name}}</span>
            <span class="message-data-time">{{message.timestamp}}</span>
          </div>
          <div class="message other-message">
            {{message.message}}
          </div>
        </li>
      </div>
    </div>
  </ul>
  <CreateMessage :name="name"/>
</div>
</template>

<script>
import CreateMessage from '@/components/CreateMessage';
import fb from '@/firebase/init';
import moment from 'moment';
export default {
    name: 'Chat',
    props: ['name'],
    components: {
        CreateMessage
    },
    data() {
        return {
            messages: []
        }
    },
    created() {
      let ref = fb.collection('messages').orderBy('timestamp');
      ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
              if (change.type == 'added') {
                  let doc = change.doc;
                  this.messages.push({
                      id: doc.id,
                      name: doc.data().name,
                      message: doc.data().message,
                      timestamp: moment(doc.data().timestamp).format('LTS')
                  });
              }
          });
      });
    }
}
</script>

<style>
.hat {
  height: 63vh;
  width:100%;
}
.history {
  height:55vh;
  width:100%;
  padding:10px;
  overflow: auto;
}
::-webkit-scrollbar {
    width: 0px; /* For Chrome, Safari, and Opera */
}
.message-data {
  margin-bottom: 15px;
}
.message-data-time {
    color: #92959E;
    padding-left: 6px;
}

.message-data-name {
    color: white;
    font-size: 16px;
    padding-right: 6px;
}

.message {      
  color: white;
  padding: 18px 20px;
  word-wrap: break-word;
  line-height: 21px;
  font-size: 16px;
  border-radius: 7px;
  margin-bottom: 30px;
  width: 50%;
  position: relative;
}

.my-message {
  background: #94C2ED;
}

.other-message {
  background: #86BB71;
}

.online {
  color: #86BB71;
}
.me {
  color: #94C2ED;
}

.align-left {
  text-align: left;
}

.align-right {
  text-align: right;
}
.float-right {
  float: right;
}

ul{list-style:none}

.clearfix:after {
  visibility: hidden;
  display: ;
  font-size: 0;
  content: "";
  clear: both;
  height: 0;
}
</style>