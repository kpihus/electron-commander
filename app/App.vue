<template>
    <div id="app">
        <navbar placement="top" type="default">
            <a slot="brand" href="#" title="Sid Commander" class="navbar-brand">Sid Commander</a>
            <dropdown text="Dropdown">
                <li><a href="link">Option</a></li>
            </dropdown>
        </navbar>
        <div class="container">
            <accordion type="info" :one-at-atime="checked">
                <panel v-for="item in commands">
                <strong slot="header"><u>{{item.title}}</u></strong>
                    {{item.message}}
                </panel>
            </accordion>
        </div>
    </div>
</template>

<script>
  import {accordion, panel, navbar} from 'vue-strap';
  export default {


    components: {
      accordion, panel, navbar
    },

    data () {
      return {
        commands: []
      }
    },

    filters: {},

    created () {
      console.log('CREATED',); //TODO: REMOVE
    },

    methods: {}

  }
</script>
