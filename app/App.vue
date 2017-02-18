<template>
    <div id="app">
        <navbar placement="top" type="default">
            <a slot="brand" href="#" title="Sid Commander" class="navbar-brand">Sid Commander</a>
            <dropdown text="Messages">
                <li class="menu_item"><span><strong>Add new</strong></span></li>
            </dropdown>
        </navbar>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
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
            <div class="row">
                <div class="col-md-12">
                    <panel>
                        <strong slot="header">Connected clients</strong>
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in clients">
                                <td>{{item.name}}</td>
                                <td>{{item.status}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </panel>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .menu_item {
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
        commands: [],
        clients: []
      }
    },

    filters: {},

    created () {
      var self = this;
      console.log('CREATED',); //TODO: REMOVE
      this.getMessages();
      this.$socket.on('clientin', function (clientItem) {
        clientItem.status= 'Connected';
        self.clients.push(clientItem);


      });
      this.$socket.on('clientout', function(clientId){
        console.log('CLIENTOUT', clientId); //TODO: REMOVE
        self.removeClient(clientId);
      });

      this.$socket.on('clientack', function(clientId){
        self.setAck(clientId);
      })
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
        console.log('Sending Message', text)
        this.$socket.emit("message", text);
        this.setSent();
      },
      removeClient(clientId){
       var client = this.clients.find(function(item){
         console.log('REMOVE ITEM', item); //TODO: REMOVE
         return item.clientid === clientId;
         });
       console.log('CLIENT TO REMOVE',client)
        this.clients.$remove(client);

      },
      setSent(){
        this.clients.forEach(function (item) {
          item.status = 'Sent'
        })
      },
      setAck(clientId){
        console.log(clientId)
        this.clients.forEach(function (item) {
          if(item.clientid === clientId){
            item.status = 'Received'
          }
        })
      }
    }

  }
</script>
