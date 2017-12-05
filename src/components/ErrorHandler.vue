<template>
  <div class="container content">
    <div class="modal-mask" transition="modal">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h4 class="red-text">{{title}}</h4>
          </div>

          <div class="modal-body">
            <h5 class="font-bold">Error message</h5>
            <p class="text-justify word-wrap">{{message}}</p>
          </div>

          <div class="modal-footer">
            <button class="btn btn-red" @click="redirectHome" v-if="$route.name != 'Login' && $route.name != 'Signup'">Return to Home page</button>
            <button class="btn btn-red" @click="$parent.showErrorHandler = false" v-else>OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: 'An error occurred...'
    };
  },
  props: ['message'],
  methods: {
    redirectHome: () => {
      if (document.location.hash !== '#/') {
        document.location = './#/';
      } else {
        document.location.reload();
      }
    }
  }
};
</script>


<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    align-items: center;
  }

  .modal-container {
    width: 50%;
    margin: 0px auto;
    padding: 10px 10px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }
</style>

