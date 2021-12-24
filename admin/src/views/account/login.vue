<template>
    <div class="login">
        <div class="login-content">
            <div class="login-content__body">
                <div class="login-img"></div>
                <div class="login-form">
                    
                </div>
            </div>
        </div>
        <div class="login-footer">footer</div>
    </div>
</template>

<script>
export default {
    name: 'Login',
}
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-image: url('./images/login_bg.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .login-content {
        flex: 1;
        display: flex;
        align-items: center;
        margin: 0 auto;
        width: 800px;
        &__body {
            display: flex;
            width: 100%;
            height: 400px;
            box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.08);
            border-radius: 10px;
            overflow: hidden;
            & > div {
                width: 50%;
                height: 100%;
            }
            .login-img {
                background-image: url('./images/login_banner.png');
                box-sizing: border-box;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
            }
        }
    }
}
</style>
