<template>
  <div class="container" id="new_short">
            <div class="row">
                <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                    <h1 class="display-4 py-2" style="color: black;">Create your own short url !</h1>
                    <div class="px-2">
                        <form @submit.prevent="createUrl" class="justify-content-center">
                            <div class="form-group">
                                <label class="sr-only">URL</label>
                                <input type="text" class="form-control" v-model="originalUrl" placeholder="your url" required>
                            </div>
                            <div class="form-group">
                                <label class="sr-only">NAME</label>
                                <input type="text" class="form-control" v-model="userShort" placeholder="your prefer short name (max length 7)">
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
            requestUrl: 'http://192.168.0.103:8000/',
            message: 'get short url !',
            originalUrl: '',
            userShort: '',
            haveShort: false,
            yourShortUrl: '',
            saySomething: '',
            getSuccess: false,
        }
    },
    methods: {
        async createUrl () {
            // send request 
            const data = `shortname=${this.userShort}&&url=${this.originalUrl}`
            const response = await fetch(this.requestUrl+'api', {
                method: 'post',
                headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: data
            });

            const result = await response.json()
            this.haveShort = true

            if (result.checkCode == 100) {
                // fail
                this.getSuccess = false
                this.userShort = result.short_name
                this.saySomething = `Your desired short url had been occupied !\n Maybe use  ${result.short_name}  ?
                    Press button to create short url !`
                this.yourShortUrl = ''
            } else {
                // work !
                this.getSuccess = true
                this.originalUrl = ''
                this.userShort = ''
                this.saySomething = "\n\n\n\nThis is your url :"
                this.yourShortUrl = `${this.requestUrl}${result.short_name}`
            }
        }
    }
  }
</script>