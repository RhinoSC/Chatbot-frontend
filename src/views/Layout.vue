<template>
  <main>
    <img class="bg" src="/assets/layout.png" alt="" />
    <h1 class="comentaristas-title">comentaristas</h1>
    <div id="logos">
      <div id="gdq">
        <img src="/assets/sgdqlogo.png" />
      </div>
      <div id="sre">
        <img src="/assets/logo_plano.png" alt="sre_logo" />
      </div>
    </div>
    <div class="bg-bar">
      <div class="bar">
        <div class="bienvenida">
          <h1 class="bienvenida-texto">
            Retransmisión en español <span>Summer Games Done Quick 2022</span>
          </h1>
        </div>
        <div class="redes">
          <h1 class="redes-texto">
            Siguenos en:
            <span class="social-red">
              <img class="social-img" src="/assets/twitter.svg" alt="" />
              <span class="social-text">@SPEEDRUNESPANOL</span>
            </span>
          </h1>
        </div>
        <div class="list">
          <h1 class="list-texto">Ya viene:</h1>
          <div class="next">
            <h1 class="next-title">
              {{ actualGame }}
            </h1>
            <h2 class="next-runner">
              <font-awesome-icon class="icons" icon="running" />
              <span>{{ actualRunner }}</span>
            </h2>
            <h3 class="next-time">
              <font-awesome-icon class="icons" icon="clock" /><span>{{
                actualTime
              }}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
    <!-- <button id="btn" style="margin: 500px" @click="changeHoraro()">
      hoiaofiajf
    </button> -->
  </main>
</template>

<script>
import gsap from "gsap";

import API from "../api/index";

export default {
  components: {},
  data() {
    return {
      items: [],
      columns: [],
      counter: 0,
      max: -1,
      showMax: 3,
      // actualGame: "Bonus Game 1 - Metal Gear Solid 2: Substance",
      actualGame: "",
      actualRunner: "",
      actualTime: "",
      timeline: gsap.timeline({
        repeat: -1,
        repeatDelay: 10,
      }),
      tiempos: [2, 10, 3, 4],
      socials: [
        {
          name: "twitter",
          img: "/assets/twitter.svg",
          social: "@SPEEDRUNESPANOL",
        },
        {
          name: "youtube",
          img: "/assets/youtube.svg",
          social: "SPEEDRUNSESPANOL",
        },
      ],
    };
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    advance: function () {
      this.counter++;
      this.timeline.restart().clear();
      this.changeHoraro();
      this.startAnimation();
    },
    manualAdvance: function (counter) {
      this.counter = counter + 1;
      this.timeline.restart().clear();
      this.changeHoraro();
      this.startAnimation();
    },
    back: function () {
      this.counter--;
      this.timeline.restart().clear();
      this.changeHoraro();
      this.startAnimation();
    },
    getCounter(counter) {
      this.counter = counter + 1;
    },
  },
  methods: {
    initialState() {
      //   height: 45px;
      //   height: 80px;
      this.timeline.set(".bar", { height: "45px" });
      this.timeline.set([".bienvenida", ".redes", ".list"], {
        display: "none",
        opacity: 0,
      });
      this.timeline.set([".social-img", ".social-text"], { opacity: 0 });
    },
    showGreetings() {
      let div = document.querySelector(".bienvenida");
      this.timeline
        .to(div, {
          duration: 1,
          display: "block",
          opacity: 1,
        })
        .to(div, {
          duration: 1,
          opacity: 0,
          delay: this.tiempos[1],
        })
        .set(div, { display: "none" });
      return true;
    },
    showSocials() {
      let div = document.querySelector(".redes");
      let img = document.querySelector(".social-img");
      let text = document.querySelector(".social-text");
      this.timeline.to(div, {
        duration: 1,
        display: "block",
        opacity: 1,
        delay: this.tiempos[1],
      });
      this.timeline
        .to([img, text], {
          duration: 1,
          display: "block",
          opacity: 1,
        })
        .to([img, text], {
          duration: 1,
          opacity: 0,
          delay: this.tiempos[1],
          onComplete: () => {
            img.src = this.socials[1].img;
            text.innerHTML = this.socials[1].social;
          },
        });
      this.timeline
        .to([img, text], {
          duration: 1,
          display: "block",
          opacity: 1,
        })
        .to([img, text], {
          duration: 1,
          opacity: 0,
          delay: this.tiempos[1],
        });
      this.timeline
        .to(div, {
          duration: 1,
          opacity: 0,
          delay: 1,
        })
        .set(div, { display: "none" });
      return true;
    },
    showNextRuns() {
      let div = document.querySelector(".list");
      let next = document.querySelector(".next");

      this.timeline
        .set(".list-texto", {
          x: "-15px",
        })
        .to(div, {
          duration: this.tiempos[0],
          display: "flex",
          opacity: 1,
          delay: 1,
        })
        .to(".list-texto", {
          duration: this.tiempos[2],
          x: "-743px",
          delay: this.tiempos[2],
        })
        .to(".bar", {
          duration: 1,
          height: "80px",
          delay: 1,
        })
        .to(next, {
          duration: this.tiempos[3],
          x: "-758px",
          delay: 1,
          ease: "Power2.easeInOut",
        })
        .to([".list-texto", next], {
          duration: 1,
          opacity: 0,
          delay: this.tiempos[1],
        });
      for (let i = 1; i < this.showMax; i++) {
        if (this.counter + i < this.max) {
          this.timeline
            .set(next, {
              x: "0px",
              opacity: 1,
              // onComplete: () => {
              //   this.changeHoraro(this.counter + i);
              // },
            })
            .to(next, {
              duration: this.tiempos[3],
              x: "-758px",
              delay: this.tiempos[2],
              ease: "Power2.easeInOut",
            })
            .to(next, {
              duration: 1,
              opacity: 0,
              delay: this.tiempos[1],
            });
        } else {
          break;
        }
      }
      this.timeline
        .set(next, {
          x: "0px",
          opacity: 1,
        })
        .to(div, {
          duration: this.tiempos[0],
          opacity: 0,
          delay: 1,
        })
        .set(div, { display: "none" })
        .to(".bar", {
          duration: 1,
          height: "45px",
        });

      return true;
    },
    changeHoraro(count = this.counter) {
      if (count < this.max) {
        let index = this.columns.findIndex((element) => element == "Juego");
        this.actualGame = this.items[count].data[index];
        index = this.columns.findIndex((element) => element == "Runner/s");
        this.actualRunner = this.items[count].data[index];
        this.actualTime = this.toHHMMSS(this.items[count].length_t);
        return true;
      }
      return false;
    },
    alternateLogos() {
      let tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 10,
      });

      tl.set("#sre", { opacity: 0 });
      tl.to("#gdq", {
        duration: 1,
        opacity: 0,
        delay: 10,
      })
        .to(
          "#sre",
          {
            duration: 1,
            opacity: 1,
          },
          "-=1"
        )
        .to("#sre", {
          duration: 1,
          opacity: 0,
          delay: 10,
        })
        .to(
          "#gdq",
          {
            duration: 1,
            opacity: 1,
          },
          "-=1"
        );
      return true;
    },
    toHHMMSS(sec_num) {
      let hours = Math.floor(sec_num / 3600).toString();
      let minutes = Math.floor(
        (sec_num - Number(hours) * 3600) / 60
      ).toString();
      let seconds = (
        sec_num -
        Number(hours) * 3600 -
        Number(minutes) * 60
      ).toString();

      if (Number(hours) < 10) {
        hours = "0" + hours;
      }
      if (Number(minutes) < 10) {
        minutes = "0" + minutes;
      }
      if (Number(seconds) < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds;
    },
    startAnimation() {
      this.initialState();
      this.showGreetings();
      this.showSocials();
      this.showNextRuns();
    },
  },
  created: async function () {
    this.$socket.emit("getCounter");
  },
  mounted: async function () {
    this.alternateLogos();
    let response = await API.getHoraro();
    this.items = response.data.items;
    this.max = this.items.length;
    this.columns = response.data.columns;
    this.changeHoraro();
    this.startAnimation();

    let interval = setInterval(async () => {
      let response = await API.getHoraro();
      this.items = response.data.items;
      this.max = this.items.length;
      this.columns = response.data.columns;
    }, 600000);
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "pixel";
  src: url("/assets/Notalot60.ttf");
}
@font-face {
  font-family: "haboro";
  src: url("/assets/haboro.ttf");
}
main {
  margin: 0;
  box-sizing: border-box;
  padding: 0;
  font-family: "haboro", "Courier New", Courier, monospace;
  color: white;
}

.bg {
  position: absolute;
  z-index: -1;
}

.comentaristas-title {
  position: absolute;
  color: white;
  font-family: "pixel";
  font-size: 17px;
  letter-spacing: 2px;
  text-transform: uppercase;
  top: 34px;
  left: 6px;
}

#logos {
  position: absolute;
  top: 1005px;
  left: 16px;

  #sre {
    position: absolute;
    top: -43px;
    left: -59px;
    img {
      width: 250px;
    }
  }
}

.bg-bar {
  position: absolute;
  width: 785px;
  height: 85px;
  top: 995px;
  left: 655px;
  display: flex;
  align-items: center;
  justify-content: center;
  // background: url("/assets/barrabot.png");
}

.bar {
  max-width: 685px;
  flex: 1 0 685px;
  position: relative;
  height: 45px;
  // height: 80px;
  margin: 20px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 5px 5px 0px rgba(0, 0, 0, 0.5),
    inset -1px -1px 0px 0px rgba(255, 255, 255, 0.22);
  background: linear-gradient(to top, #232b52, #1b3653);

  .bienvenida {
    //232b52 to 1b3653
    &-texto {
      font-size: 25px;
      span {
        font-style: italic;
        // color: #00ffff;
        color: #ff9a00;
      }
    }
  }

  .redes {
    &-texto {
      font-size: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .social-red {
      margin-left: 10px;
      display: flex;
      .social-img {
        width: 25px;
      }

      .social-text {
        margin-left: 10px;
        font-size: 22px;
      }
    }
  }

  .list {
    height: 80px;
    display: flex;
    align-items: center;
    justify-items: center;
    overflow: hidden;
    flex-wrap: nowrap;
    .list-texto {
      flex: 0 0 758px;
      text-align: center;
    }

    .next {
      flex: 1 1 auto;
      display: grid;
      grid-template-rows: 50px 0.7fr;
      // grid-template-rows: 1fr 0.7fr;
      // grid-template-columns: 1fr 0.3fr;
      grid-template-columns: 565px 113px;
      align-items: center;

      .icons {
        // color: #00ffff;
        color: #ff9a00;
        //   color: #dadd43;
        margin-right: 5px;
      }

      &-title {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
        padding-left: 10px;
        word-break: break-word;
        font-size: 25px;
      }
      &-runner {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
        padding-left: 10px;
        font-size: 20px;
        //   color: #dadd43;
        // font-family: "pixel";
        // letter-spacing: 2px;
      }
      &-time {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        text-align: right;
        padding-right: 10px;
      }
    }
  }
}
</style>