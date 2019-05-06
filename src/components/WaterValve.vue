<template>
  <div>
    <div class="controls">
        <h2>Default Ranges</h2>
        <div class='parameter'><span class='parameter__label'>Normal flow closed min:</span><input class='parameter__value' v-model.number="flowClosedMin"></div>
        <div class='parameter'><span class='parameter__label'>Normal flow closed max:</span><input class='parameter__value' v-model.number="flowClosedMax"></div>
        <div class='parameter'><span class='parameter__label'>Normal flow open min:</span><input class='parameter__value' v-model.number="flowOpenMin"></div>
        <div class='parameter'><span class='parameter__label'>Normal flow open max:</span><input class='parameter__value' v-model.number="flowOpenMax"></div>
        <div class='parameter'><span class='parameter__label'>Normal pressure closed min:</span><input class='parameter__value' v-model.number="pressureClosedMin"></div>
        <div class='parameter'><span class='parameter__label'>Normal pressure closed max:</span><input class='parameter__value' v-model.number="pressureClosedMax"></div>
        <div class='parameter'><span class='parameter__label'>Normal pressure open min:</span><input class='parameter__value' v-model.number="pressureOpenMin"></div>
        <div class='parameter'><span class='parameter__label'>Normal pressure open max:</span><input class='parameter__value' v-model.number="pressureOpenMax"></div>
    </div>
    <div class="controls">
        <h2>Forced Value Adjustments</h2>
        <div class='parameter'><span class='parameter__label'>Flow Adjust:</span><input class='parameter__value' v-model.number="flowAdjust"></div>
        <div class='parameter'><span class='parameter__label'>Pressure Adjust:</span><input class='parameter__value' v-model="pressureAdjust"></div>
        <div class='parameter'><span class='parameter__label'>Time Adjust (minutes):</span><input class='parameter__value' v-model="timeAdjust"></div>
    </div>
    <div class="controls">
        <h2>User Actions</h2>
        <div class='parameter'><span class='parameter__label'>Valve Open:</span><input type='checkbox' class='parameter__value' v-model="open"></div>
    </div>
    <div class="output">
        <h2>Output</h2>
        <div class='section-note'><span class='section-note__label'>Next Update In:</span><span class='section-note__value'>{{ secondsUntilUpdate }}</span></div>
        <div class='parameter'><span class='parameter__label'>Flow:</span><span class='parameter__value'>{{ lastFlow }}</span></div>
        <div class='parameter'><span class='parameter__label'>Pressure:</span><span class='parameter__value'>{{ lastPressure }}</span></div>
        <div class='parameter'><span class='parameter__label'>Valve Open:</span><span class='parameter__value'>{{ lastOpen }}</span></div>
        <div class='section-note'><span class='section-note__label'>Last Updated:</span><span class='section-note__value'>{{ lastUpdated }}</span></div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'WaterValve',
   data : function(){
    return {
      pressureClosedMin : 45,
      pressureClosedMax : 55,
      pressureOpenMin : 40,
      pressureOpenMax : 40,
      flowClosedMin : 0,
      flowClosedMax : 0,
      flowOpenMin : 10,
      flowOpenMax : 10,
      pressureAdjust : 0,
      flowAdjust : 0,
      timeAdjust : 0,
      lastUpdated : '',
      lastFlow : 0,
      lastPressure : 0,
      lastOpen : false,
      open : false,
      client : null,
      ticker : null,
      secondsUntilUpdate : 10,
    }
  },
  mounted : function(){
     var self = this;
     
     setInterval(function() {
        self.secondsUntilUpdate--;
        if ( self.secondsUntilUpdate < 1 ){
          self.secondsUntilUpdate = 10;
          self.ticker = new Date();
          self.updateLosant();
        }

     }, 1000);
  },
  computed : {
    pressure : function(){
      let ticker = this.ticker;
      if ( !ticker ){
        return;
      }
      if ( this.open ){
        return this.random( this.pressureOpenMin, this.pressureOpenMax ) + parseFloat( this.pressureAdjust );
      }else{
        return this.random( this.pressureClosedMin, this.pressureClosedMax ) + parseFloat( this.pressureAdjust );
      }
    },
    flow : function(){
      let ticker = this.ticker;
      if ( !ticker ){
        return;
      }
      return this.open ? this.random( this.flowOpenMin, this.flowOpenMax ) + parseFloat( this.flowAdjust ) : this.random( this.flowClosedMin, this.flowClosedMax ) + parseFloat( this.flowAdjust );
    },
    time : function(){
      let t = new Date( this.ticker.getTime() );
      t.setMinutes( t.getMinutes() + this.timeAdjust );
      return t;
    }
  },
  methods : {
    updateLosant: function () {
      let state = {
        "data" : {
          "Open" : this.open,
          "Flow" : parseFloat( this.flow ),
          "Pressure" : parseFloat( this.pressure )
        },
        "time" : this.time
      };
      let topic = "losant/" + this.getUrlVar( "device" ) +  "/state";
      this.$mqtt.publish( topic, JSON.stringify( state ) );
      this.lastUpdated = this.time;
      this.lastOpen = this.open;
      this.lastFlow = this.flow;
      this.lastPressure = this.pressure;

    },
    random : function ( min, max ){
      return Math.floor( Math.random() * ( max - min + 1 ) + min );
    },
    getUrlVar : function( param ) {
      var vars = {};
      window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
          vars[key] = value;
      });
      return vars[ param ];
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
