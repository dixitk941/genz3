import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPencilAlt, faUndo, faRedo, faEraser, faCircle, faFont, faUpload, faPaintBrush, faSquare, faExclamationTriangle, faSlash, faAdjust, faImage ,faTh } from '@fortawesome/free-solid-svg-icons'

library.add({ faPencilAlt, faUndo, faRedo, faEraser, faCircle, faFont, faUpload, faPaintBrush, faSquare, faExclamationTriangle, faSlash, faAdjust, faImage , faTh });

Vue.component('font-awesome-icon', FontAwesomeIcon);