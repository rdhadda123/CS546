import { checkName, checkPassword, checkQuote, checkRole, checkUserId } from "../../helpers.js"

// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
let registerForm = document.getElementById('signup-form')
let signinForm = document.getElementById('signin-form')

if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const firstName = document.getElementById('firstName').value
        const lastName = document.getElementById('lastName').value
        const userId = document.getElementById('userId').value
        const password = document.getElementById('password').value
        const confirmPassword = document.getElementById('confirmPassword').value
        const favoriteQuote = document.getElementById('favoriteQuote').value
        const backgroundColor = document.getElementById('backgroundColor').value
        const fontColor = document.getElementById('fontColor').value
        const role = document.getElementById('role').value

        if (!firstName){
            alert("firstName is necessary to sign up.")
            return
        }
        if (!lastName){
            alert("lastName is necessary to sign up.")
            return
        }
        if (!userId){
            alert("UserId is necessary to sign up.")
            return
        }
        if (!password) {
            alert("Password is necessary to sign up")
            return
        }
        if (!confirmPassword) {
            alert("Confirmed Password is necessary to sign up")
            return
        }
        if (!favoriteQuote){
            alert("quote is necessary to sign up.")
            return
        }
    
        if (!backgroundColor){
            alert("backgroundColor is necessary to sign up.")
            return
        }
        if (!fontColor){
            alert("fontColor is necessary to sign up.")
            return
        }
        if (!role){
            alert("role is necessary to sign up.")
            return
        }

        try {
            firstName = checkName(firstName)
            lastName = checkName(lastName)
            userId = checkUserId(userId)
            password = checkPassword(password)
            confirmPassword = checkPassword(confirmPassword)

            if (password !== confirmPassword){
                alert("Password do not match")
                return
            }

            favoriteQuote = checkQuote(favoriteQuote)
            const theme = {backgroundColor: backgroundColor, fontColor: fontColor}
            theme = checkTheme(theme)
            role = checkRole(role)
        } catch (e) {
            alert(e)
        }
    })
}
if (signinForm) {
    signinForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const userId = document.getElementById('userId').value
        const password = document.getElementById('password').value
        if (!userId){
            alert("UserId is necessary to sign up.")
            return
        }
        if (!password) {
            alert("Password is necessary to sign up")
            return
        }

        try {
            userId = checkUserId(userId)
            password = checkPassword(password)
        } catch (e) {
            alert(e)
        }
    })
}