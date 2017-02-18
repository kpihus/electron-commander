<template>
    <div id="app">
        <navbar placement="top" type="default">
            <a slot="brand" href="#" title="Sid Commander" class="navbar-brand">Sid Commander</a>
            <dropdown text="Messages">
                <li class="menu_item"><span><strong>Add new</strong></span></li>
            </dropdown>
        </navbar>
        <div class="container-fluid">
            <accordion type="info" :one-at-atime="checked">
                <panel v-for="item in commands">
                <strong slot="header"><u>{{item.title}}</u></strong>
                    <div class="row">
                        <div class="col-md-10">
                            {{item.message}}
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-success" @click="sendMessage(item.message)">Send</button>
                        </div>
                    </div>

                </panel>
            </accordion>
        </div>
    </div>
</template>
<style>
    .menu_item{
        cursor: pointer;
        padding: 10px
    }
</style>

<script>
  import {accordion, panel, navbar, dropdown} from 'vue-strap';
  export default {


    components: {
      accordion, panel, navbar, dropdown
    },

    data () {
      return {
        commands: []
      }
    },

    filters: {},

    created () {
      console.log('CREATED',); //TODO: REMOVE
      this.getMessages();
    },

    methods: {
      getMessages(){
        this.$http.get('http://localhost:3000/messages')
          .then(function (response) {
            console.log(response)
            this.$set('commands', response.body)
          })
      },
      sendMessage(text){
        console.log('Sending Message',text)
        this.$socket.emit("message", text);
      }
    }

  }
</script>
