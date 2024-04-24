<template>
  <div class="container mt-5">
    <b-button v-b-modal.modal-prevent-closing>Create Classroom</b-button>
    <panel v-if="LiveLectures.length > 0" class="mt-3" title="Create Live Lecture" noButton="true">
	    <div class="mt-2">
	      <b-table responsive bordered sticky-header striped :fields="fields" :items="LiveLectures">
	      	<template v-slot:cell(Sr)="data">
		        {{ data.index + 1 }}
		    </template>

		    <template v-slot:cell(Link)>
		        <a href="">{{fullUrl}}</a>
		        <input type="text" hidden ref="hiddenURL">
		    </template>

		    <template v-slot:cell(StudentName)="datas">
		        <div v-for="data in datas.value">
		        	{{data}}
		       	</div>
		    </template>

		  </b-table>
	    </div>
	</panel>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Create Classroom"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form ref="form" @submit.stop.prevent="handleOk">
	    <b-form-group
	        id="input-group-1"
	        label="Lecture Name"
	        label-for="input-1"
	        description="Create Unique lecture name."
	    >
	        <b-form-input
	          id="input-1"
	          v-model="name"
	          placeholder="Enter Lecture Name"
	          required
	        ></b-form-input>
	    </b-form-group>

	    <b-form-group id="input-group-2" label="Professor Name" label-for="input-2">
	        <b-form-input
	          id="input-2"
	          v-model="ProfessorName"
	          required
	          placeholder="Enter Professor Name"
	        ></b-form-input>
	    </b-form-group>

	    <b-form-group label="Choose a Date">
    		<b-form-datepicker v-model="ScheduledDate" class="mb-2"></b-form-datepicker>
    	</b-form-group>
    	
    	<b-form-group label="Choose a Time">
    		<b-form-timepicker v-model="ScheduledTime" locale="en"></b-form-timepicker>
    	</b-form-group>

	    <b-form-group label="Student Name">
	        <b-form-tags
	          v-model="StudentName" add-on-change no-outer-focus class="mb-2">

	        	<template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
		          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
		            <li v-for="tag in tags" :key="tag" class="list-inline-item">
		              <b-form-tag
		                @remove="removeTag(tag)"
		                :title="tag"
		                :disabled="disabled"
		                variant="info"
		              >{{tag}}</b-form-tag>
		            </li>
		          </ul>
		          <b-form-select
		            v-bind="inputAttrs"
		            v-on="inputHandlers"
		            :disabled="disabled || availableOptions.length === 0"
		            :options="availableOptions"
		          >
		            <template v-slot:first>
		              
		              <option disabled value="">Choose a Student...</option>
		            </template>
		          </b-form-select>
		        </template>

	        </b-form-tags>
	    </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import firebase from 'firebase';
import fb from '@/firebase/init';
import moment from 'moment';
  export default {
    data() {
      return {
      	fields: [{ key: 'Sr', label: '' },'LectureName','ProfessorName','StudentName','ScheduledDate','ScheduledTime','timestamp','Link'],
        LiveLectures : [],
        name: '',
        ProfessorName: '',
        StudentName : [],
        timestamp : '',

        ScheduledDate: '',
        ScheduledTime: '',
	    
	    fullUrl : '',

        options: ['Arpit Gupta', 'Sujal Gupta', 'MS Dhoni', 'Naruto Uzumaki', 'Lelouch Brittania', 'hIDEKI ryuga', 'Demon Slayer'],
        option : []
      }
    },
    computed: {
      availableOptions() {
        return this.option
      }
    },
    methods: {
      resetModal(bvModalEvt) {
        this.name = ''
        this.ProfessorName = ''
        this.StudentName = ''
        this.timestamp = ''
        this.ScheduledDate = ''
        this.ScheduledTime = ''
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault();

        const Lectures = firebase.functions().httpsCallable('createLectures');

	  	Lectures({ LectureName:this.name,ProfessorName:this.ProfessorName,StudentName:this.StudentName,ScheduledDate: this.ScheduledDate,ScheduledTime :this.ScheduledTime,timestamp:Date.now() }) 
  		.then(() => {
  			console.log('successful');
  		})
  		.catch(err => console.log(err));

        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },

      path(){
           const path = this.$router.resolve({
		      name:'Login'
		    }).href;
		    this.fullUrl = window.location.origin +'/'+ path   
      },


	  showLecture() {

	  	let ref = fb.collection('LiveLectures').orderBy('timestamp');
	      ref.onSnapshot(snapshot => {
	          snapshot.docChanges().forEach(change => {
	              if (change.type == 'added') {
	                  let doc = change.doc;
	                  this.LiveLectures.push({
	                      LectureName: doc.data().LectureName,
	                      ProfessorName: doc.data().ProfessorName,
	                      StudentName: doc.data().StudentName,
	                      ScheduledDate: doc.data().ScheduledDate,
	                      ScheduledTime: doc.data().ScheduledTime,
	                      timestamp: moment(doc.data().timestamp).format('LTS')
	                  });
	              }
	          });
	      });
	  },


	  getOptions() {
	  	const student = firebase.functions().httpsCallable('getStudents');
	  	student().then(result => {
	  		this.option = result.data;
	  	})
	  	.catch(err => console.log(err));
	  }

    },
    mounted() {
    	this.path()	
    	this.showLecture()
    	this.getOptions()
    },
    
  }
</script>
