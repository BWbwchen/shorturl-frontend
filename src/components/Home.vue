<template>
  <div class="container" id="new_short">
            <div class="row">
                <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                    <h1 class="display-5 py-2" style="color: black;">Create your own short url !</h1>
                    <div class="px-2">
                        <form @submit.prevent="createUrl" class="justify-content-center">
                            <div class="form-group">
                                <label class="sr-only">URL</label>
                                <input type="text" class="form-control" v-model="originalUrl" placeholder="your url" required>
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg">Create short url now !</button>
                        </form>
                    </div>
                    <p v-if="haveShort" style="color:black; white-space: pre;">{{saySomething}} <a v-if="getSuccess" :href="yourShortUrl">{{ yourShortUrl}}</a></p>
                </div>
            </div>
        </div>
</template>

<script>
  export default {
    data() {
        return {
            requestUrl: 'http://bwbwchen.ddns.net:29345',
            //requestUrl: 'http://192.168.0.201:30390',
            //requestUrl: process.env.VUE_APP_MYURL,
            message: 'get short url !',
            originalUrl: '',
            haveShort: false,
            yourShortUrl: '',
            saySomething: '',
            getSuccess: false,
        }
    },
    methods: {
        async createUrl () {
            // send request 
            const data = {
                "url": this.originalUrl,
            }
            console.log(this.requestUrl+'/add')
            console.log(process.env.VUE_APP_LL)
            const response = await fetch(this.requestUrl+'/add', {
                method: 'POST',
                mode: 'cors',
                headers: {
                  "Content-type": "application/json",
                  //"Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(data)
            });


            const result = await response.json()
            this.haveShort = true

            if (response.status != 200) {
                // login fail
                this.getSuccess = false
                this.saySomething = `Something went wrong !`
                this.yourShortUrl = ''
                this.$router.push('/');
            } else {
                // work !
                this.getSuccess = true
                this.originalUrl = ''
                this.saySomething = "\n\n\n\nThis is your url :"
                this.yourShortUrl = `${this.requestUrl}/${result.short}`
            }
        }
    }
  }
</script>