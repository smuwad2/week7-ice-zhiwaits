<script setup>
    import monster from '/assets/monster.png' 
    import prince from '/assets/prince.png'
</script>

<script>
    export default { 
        data() {
            return {
                gameStarted: false,
                buttonSpecialAttack: null,
                buttonDetails: [
                    {
                        action: "attack",
                        btnType: "btn-danger",
                        value: "ATTACK",
                        show: true,
                    },
                    {
                        action: "specialAttack",
                        btnType: "btn-warning",
                        value: "SPECIAL ATTACK",
                        show: true,
                    },
                    {
                        action: "heal",
                        btnType: "btn-success",
                        value: "HEAL",
                        show: true,
                    },
                    {
                        action: "giveUp",
                        btnType: "btn-link",
                        value: "GIVE UP",
                        show: true,
                    },
                ],
                myHealth: 100,
                monsterHealth: 100,
                statusList: [
                    {
                        class: "text-dark",
                        text: "Game hasn't started.",
                    },
                ],
                range: [10, 20, 30, 40, 50],
                MONSTER_MAX_ATTACK: 30,
                PLAYER_MAX_ATTACK: 20,
                MAX_HEAL: 30,
                specialAttackCoolDown: 0,
            };
        },

        created() {
            for (let details of this.buttonDetails) {
                if (details.action == "specialAttack") {
                    this.buttonSpecialAttack = details;
                    return;
                }
            }
        },

        computed: {
            reversestatusList() {
                return this.statusList.slice(0).reverse();
            },
            // buttonSpecialAttack() {
            //     for (let details of this.buttonDetails) {
            //         if (details.action == "specialAttack") {
            //             let buttonSpecialAttack = details;
            //             return buttonSpecialAttack
            //         }
            //     }
            // }
        },

        methods: {
            doAction(action) {
                this[action]();
            },

            start() {
                // console.log("do start");
                this.gameStarted = true;
                this.myHealth = 100;
                this.monsterHealth = 100;

                this.specialAttackCoolDown = 0;
                this.buttonSpecialAttack.show = true;

                this.statusList = [
                    {
                        class: "text-dark",
                        text: "Game has started",
                    },
                ];
            },

            doMonster() {
                if (this.monsterHealth > 50 || Math.random() < 0.5) {
                    // attack
                    var myDmg = Math.floor(Math.random() * this.MONSTER_MAX_ATTACK);
                    this.myHealth -= myDmg;
                    this.statusList.push({
                        class: "text-danger",
                        text:
                            "Monster attacked and you suffered " +
                            myDmg +
                            " points",
                    });

                    if (this.myHealth < 0) {
                        this.myHealth = 0;
                        this.statusList.push({
                            class: "text-muted",
                            text: "You lose. Game ends.",
                        });
                        this.gameStarted = false;
                    }
                    return;
                }

                // heal
                var heal = Math.floor(Math.random() * this.MAX_HEAL);
                this.monsterHealth += heal;
                if (this.monsterHealth > 100) this.monsterHealth = 100;
                this.statusList.push({
                    class: "text-warning",
                    text: "Monster heals itself with " + heal + " points.",
                });
            },

            doAttack(special) {
                // console.log("do attack");
                var maxMultiplier = 1;
                if (special) maxMultiplier = 2;
                var monsterDmg = Math.floor(
                    Math.random() * maxMultiplier * this.PLAYER_MAX_ATTACK
                );
                this.monsterHealth -= monsterDmg;

                var specialTxt = "";
                if (special) specialTxt = "(special)";

                this.statusList.push({
                    class: "text-dark",
                    text:
                        "You attacked " +
                        specialTxt +
                        " and monster suffered " +
                        monsterDmg +
                        " points.",
                });

                if (this.monsterHealth < 0) {
                    this.monsterHealth = 0;
                    this.statusList.push({
                        class: "text-success",
                        text: "You win. Game ends.",
                    });
                    this.gameStarted = false;
                }
            },

            decrementCooldown() {
                if (this.specialAttackCoolDown == 0) return;

                // cool down greater than zero
                this.specialAttackCoolDown--;
                if (this.specialAttackCoolDown == 0) {
                    this.buttonSpecialAttack.show = true;
                }
            },

            attack() {
                this.doAttack(false);
                if (this.monsterHealth > 0) this.doMonster();
                this.decrementCooldown();
            },

            specialAttack() {
                this.doAttack(true);
                if (this.monsterHealth > 0) this.doMonster();

                this.specialAttackCoolDown = 2;
                this.buttonSpecialAttack.show = false;
            },

            heal() {
                // console.log("do heal");
                var heal = Math.floor(Math.random() * this.MAX_HEAL);
                this.myHealth += heal;
                if (this.myHealth > 100) this.myHealth = 100;

                this.statusList.push({
                    class: "text-primary",
                    text: "You heal yourself with " + heal + " points.",
                });

                this.doMonster();
                this.decrementCooldown();
            },

            giveUp() {
                // console.log("do giveUp");
                this.gameStarted = false;
                this.statusList.push({
                    class: "text-dark",
                    text: "You ran away. Game ends.",
                });
            },
        },
    }
</script>

<template>

    <div class="container text-center">

        <div class="row pb-3">
            <div class="col-sm-1">
                <!-- blank -->
            </div>
            <div class="col-sm-3">
                <h2>YOU</h2> 
                <img :src="prince" alt="" class="w-50">
                <div class="progress my-progress">
                    <div class="progress-bar bg-success" v-bind:style="{ 'width': myHealth +'%'}">
                        {{myHealth}}%
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <!-- blank -->
            </div>
            <div class="col-sm-3">
                <h2>MONSTER</h2> 
                <img :src="monster" alt="" class="w-50">
                <div class="progress my-progress">
                    <div class="progress-bar bg-success"
                        v-bind:style="{ 'width': monsterHealth +'%'}">
                        {{monsterHealth}}%
                    </div>
                </div>
            </div>
            <div class="col-sm-1">
                <!-- blank -->
            </div>
        </div>

        <div class="row justify-content-center p-3" v-if="!gameStarted">
            <p class="lead">Select Player/Monster Strength and Start Game</p>
            <select class="col-sm-2" v-model="PLAYER_MAX_ATTACK">
                <option v-for="n in range">{{ n }}</option>
            </select>
            <div class="col-sm-8">
                <button id='start' class="btn btn-primary" @click='start'>START NEW GAME</button>
            </div>
            <select class="col-sm-2" v-model="MONSTER_MAX_ATTACK">
                <option v-for="n in range">{{ n }}</option>
            </select>
        </div>

        <div class="row justify-content-center p-3 border" v-else>
            <div class="col-sm-12">

                <!-- 
                    v-if has higher precedence than v-for. 

                    If I do this:
                        <button v-for='details in buttonDetails' v-if='details.show' ...>
                    v-if will be executed before v-for. 
                    As variable 'details' has not been set by v-for, v-if='details.show' will fail because
                    variable 'details' is undefined.
                    
                    Ref: https://v3.vuejs.org/guide/list.html#v-for-with-v-if
                    Apply v-for in a wrapping <template> before v-if in the button.
                -->
                <template v-for='details in buttonDetails'>
                    <button v-if='details.show' :class='"btn " + details.btnType'
                        @click="doAction(details.action)">{{details.value}}</button>
                        &nbsp;
                </template>
            </div>
        </div>

        <div class="row border mt-3 p-3">
            <div class="col-sm-12 text-start">
                <p v-for="status in reversestatusList" :class="status.class">{{status.text}}</p>
            </div>
        </div>

    </div>
    
</template>

<style scoped>
    .my-progress {
        height: 25px;
    }
    
</style>