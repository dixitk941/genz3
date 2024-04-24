<script>
import Home from '../pages/Home.vue'
import login from '../pages/login.vue'
import chat from '../pages/chat.vue'
import edit from '../pages/edit.vue'
import example from '../pages/example.vue'


const routes = [
  { path: '/example', component: example },
  { path: '/', name: 'home' , component: Home,        
       props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.name) {
          next();
        } else {
          next({name: 'Login'})
        }
      }
    },
  { path: '/edit', component: edit },
  { path: '/login', name: 'Login' ,component: login },
  { path: '/chat', name: 'chat' , component: chat,
        props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.name) {
          next();
        } else {
          next({name: 'Login'})
        }
      }
    },
]

export default routes;
</script>
