<template>
    <div id="app">

        <div class="container">
            <accordion type="info" :one-at-atime="checked">
                <panel header={{item.title}} v-for="item in commands">
                    {{item.message}}
                </panel>
            </accordion>
        </div>
    </div>
</template>

<script>
  import {accordion, panel} from 'vue-strap';
  export default {


    components: {
      accordion, panel
    },

    data () {
      return {
        commands: [
          {
            title: 'Command1',
            message: 'First message'
          },
          {
            title: 'Comand2',
            message: 'Second message'
          }
        ]
      }
    },

    filters: {},

    created () {
      console.log('CREATED',); //TODO: REMOVE
    },

    methods: {}

  }
</script>
