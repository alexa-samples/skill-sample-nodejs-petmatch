# Conversation and Memory

[![Part 1: Build and Customize](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/tutorial-page-marker-1-on._TTH_.png)](./1-build-and-customize.md)[![Entity Resolution](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/tutorial-page-marker-2-off._TTH_.png)](./2-entity-resolution.md)[![Memory](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/tutorial-page-marker-3-off._TTH_.png)](./3-memory.md)

## Part 1: Build and Customize Pet Match

**Overview:**

In Part 1 you'll create the Alexa skill called Pet Match. You'll set up the
Voice User Interface (VUI) from a template, create the AWS Lambda Function that
will respond to the requests from your Alexa skill's VUI, link the two together
and test to make sure it works. The template will include animal, size,
temperament, and shedding.

This tutorial assumes that you have never built an Alexa skill and will walk you
through the process with detailed instructions.

**Objectives:**

After completing this lab, you will be able to:

* Create and configure a new skill (VUI).
* Create and configure AWS Lambda (backend).
* Connect your VUI to your AWS Lambda.
* Test your skill using a variety of simulation tools.
* Configure Dialog Management and delegate slot elicitation.

## Task 1: Create the Voice User Interface

1.  **Go to the [Amazon Developer Portal](http://developer.amazon.com).  In the top-right corner of the screen, click the "Sign In" button.** </br>(If you don't already have an account, you will be able to create a new one for free.)


2.  Once you have signed in, move your mouse over the **Your Alexa Consoles** text at the top of the screen and Select the **Skills (New)** Link.


3.  From the **Alexa Skills Console (New Console)** select the **Create Skill** button near the top of the screen.


4. Give your new skill a **Name**. This is the name that will be shown in the Alexa Skills Store, and the name your users will refer to. Push Next.

5. Select the **Custom** model at the top of the page to add to your skill and select the **Create Skill** button at the top right.

6. **Build the Interaction Model for your skill**
	1. On the left hand navigation panel. Select the **Invocation** tab. Enter a **Skill Inovcation Name**. This is the name that your users will need to say to start your skill.
	2. Next, select the **JSON Editor** tab. In the textfield provided, replace any existing code with the code provided in the [Interaction Model](../interaction-model.json), then click "Build Model".

	**Note:** You should notice that **Intents** and **Slot Types** will auto populate based on the JSON Interaction Model that you have now applied to your skill. Feel free to explore the changes here, to learn about **Intents**, **Slots**, and **Utterances** open our [technical documentation in a new tab](https://developer.amazon.com/docs/custom-skills/define-the-interaction-model-in-json-and-text.html).

7. **Optional:** Select an intent by expanding the **Intents** from the left side navigation panel. Add some more sample utterances for your newly generated intents. Think of all the different ways that a user could request to make a specific intent happen. A few examples are provided. Be sure to click **Save Model** and **Build Model** after you're done making changes here.

8. If your interaction model builds successfully, proceed to the next step. If not, you should see an error. Try to resolve the errors. In our next step of this guide, we will be creating our Lambda function in the AWS developer console, but keep this browser tab open, because we will be returning here on Task 3.


     If you get an error from your interaction model, check through this list:

     *  **Did you copy & paste the provided code correctly?**
     *  **Did you accidentally add any characters to the Interaction Model or Sample Utterances?**

🏆 Congratulations! 🏆 You've completed Task 1! You
have learned how to create a skill using an imported interaction model, which
means you have a VUI! In [Task 5: Activate Dialog Management](#task-5-activate-dialog-management)
you'll configure the VUI yourself. Next you'll create your Lambda Function.

## Task 2: Create the Lambda Function

**Overview:**

You've built your VUI. Now it's time to build the Lambda Function that will
execute the commands that your VUI sends to it. In this task, you will log into
<a href="http://aws.amazon.com" target="_blank">Amazon Web Services</a> and
create the Lambda Function. You can <a href="http://aws.amazon.com/lambda"
target="_blank">read more about what a Lambda function is</a>, but for the
purposes of this guide, what you need to know is that AWS Lambda is
where our code is hosted.  When a user asks Alexa to use our skill, it is our
Lambda function that receives the response interpreted from the VUI, executes
the code, and provides the response back to the user.

1.  **Go to the [AWS Console](https://console.aws.amazon.com/console/home).** If you don't
already have an account, you will need to create one. <a href="https://github.com/alexa/alexa-cookbook/tree/master/aws/set-up-aws.md"
target="_blank">If you haven't yet setup your AWS account, check out this quick
walkthrough for setting it up</a>.

    <a href="https://console.aws.amazon.com/console/home" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-1-sign-in-to-the-console._TTH_.png" /></a>

2.  **Click "Services" at the top of the screen, and type "Lambda" in the search box.**  You can also find Lambda in the list of services.  It is in the "Compute" section.

3.  **Check your AWS region.** Set your region to EU (Ireland).

4.  **Click the "Create a Lambda function" button.** It should be near the top
of your screen.  (If you don't see this button, it is because you haven't
created a Lambda function before.  Click the "Get Started" button.)

5.  **There are two boxes labeled "Author from scratch" and "Blueprints". Click the radio button in the box titled "Blueprints" then choose the blueprint named "alexa-skill-kit-sdk-factskill".** We have created a blueprint as a shortcut to getting everything set up for your skill. You can search for a blueprint using the provided search box.  This blueprint adds the alexa-sdk to your Lambda function so that you don't have to upload it yourself.

6.  **Configure your function.** This screen is where we will enter the important parts of our Lambda function.  These values will only ever be visible to you, but make sure that you name your function something meaningful.  "petMatch" is sufficient if you don't have another idea for a name.

  <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-7-configure-your-function._TTH_.png" />

7.  **Set up your Lambda function role.**  If you haven't done this before, we have a [detailed walkthrough for setting up your first role for Lambda](https://github.com/alexa/alexa-cookbook/tree/master/aws/lambda-role.md).  If you have done this before, set your **Existing role** value to "lambda_basic_execution."

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-9-lambda-function-role._TTH_.png" />

8. **Click Create Function in the bottom right corner.**  You will need to scroll down to find **Create Function.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-11-create-function-button._TTH_.png" />

9. **After you create the function, the ARN value appears in the top right corner. Copy this value for use in the next section of the guide.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/2-12-copy-ARN._TTH_.png" />  <!--TODO: THIS IMAGE NEEDS TO BE CUSTOMIZED FOR YOUR SKILL TEMPLATE. -->

10. **Configure your trigger.** Look at the column on the left called "Add triggers", and select Alexa Skills Kit from the list.  If you don't see Alexa Skills Kit in the list, jump back to step #3 on this page.

Once you have selected Alexa Skills Kit, scroll down and click the **Add** button. Then click the **Save** button in the top right. You should see a green success message at the top of your screen. Now, click the box that has the Lambda icon followed by the name of your function (petMatch if you used our suggestion) and scroll down to the field called "Function code".

11.  **Copy and paste the [provided code](../lambda/custom/index.js) into the Lambda function code box.**  We have provided the code for this skill on [GitHub](../lambda/custom/index.js).  Delete the contents of the code box, and paste the contents of the new code.
Click "Save".

12. **After you create the function, the ARN value appears in the top right
corner. Copy this value for use in the next section of the guide.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p1-copy-arn._TTH_.png" />

**Conclusion:**

Do you have?
*  A Lambda Function called **petMatch**.
*  The **Alexa Skills Kit** trigger attached to it.
*  An ARN.

If yes, 🏆 congratulations! 🏆 you've successfully created your Lambda Function,
which is your skill's backend! You now have a VUI and a backend. Now's the
time to connect the two together so your skill can actually do something.

## Task 3: Connect VUI to your Lambda Function

**Overview:**

In Task 1 you created the Skill and it's VUI. In Task 2 you created the Lambda
Function. In this task you will connect the two so your skill will be able to
respond to user input.

1.  **Go back to the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list) and select your skill from the list.** You may still have a browser tab open if you started at the beginning of this tutorial.

2. Select the **Endpoint** tab on the left side navigation panel.

3.  **Select the "AWS Lambda ARN" option for your endpoint.** You have the ability to host your code anywhere that you would like, but for the purposes of simplicity and frugality, we are using AWS Lambda. ([Read more about Hosting Your Own Custom Skill Web Service](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-web-service).)  With the AWS Free Tier, you get 1,000,000 free requests per month, up to 3.2 million seconds of compute time per month. Learn more at https://aws.amazon.com/free/.  In addition, Amazon now offers [AWS Promotional Credits for developers who have live Alexa skills that incur costs on AWS related to those skills](https://developer.amazon.com/alexa-skills-kit/alexa-aws-credits).

4.  Paste your Lambda's ARN (Amazon Resource Name) into the textbox provided for **Default Region**.

5. Click the **Save Endpoints** button at the top of the main panel.

🏆 Congratulations! 🏆 You have succesfully linked your VUI to your code.
You're now ready to try testing your skill! In just a few minutes you'll be able
to speak to your skill and hear a response!

## Task 4: Test

**Overview:**

In Task 1 you created the VUI, in Task 2 you created your Lambda Function and in
Task 3 you linked them together. You're now ready to test your skill! In this
task you'll learn how to do just that.

1.  **Go back to the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list) and select your skill from the list.** You may still have a browser tab open if you started at the beginning of this tutorial.

2. Open the **Test** Pane, by selecting the **Test** link from the top navigation menu.

3. Enable Testing by activating the **Test is enabled for this skill** slider. It should be underneath the top navigation menu.

4. To validate that your skill is working as expected, invoke your skill from the **Alexa Simulator**. You can either type or click and hold the mic from the input box to use your voice.
	1. **Type** "Open" followed by the invocation name you gave your skill in [Step 1](./1-voice-user-interface.md). For example, "Open Quiz Game".
	2. **Use your voice** by clicking and holding the mic on the side panel and saying "Open" followed by the invocation name you gave your skill.
	3. **If you've forgotten the invocation name** for your skill, revisit the **Build** panel on the top navigation menu and select Invocation from the sidebar to review it.

5. Ensure your skill works the way that you designed it to.
	* After you interact with the Alexa Simulator, you should see the Skill I/O **JSON Input** and **JSON Output** boxes get populated with JSON data. You can also view the **Device Log** to trace your steps.
	* If it's not working as expected, you can dig into the JSON to see exactly what Alexa is sending and receiving from the endpoint. If something is broken, AWS Lambda offers an additional testing tool to help you troubleshoot your skill.

6.  **Configure a test event in AWS Lambda.** Now that you are familiar with the **request** and **response** boxes in the Service Simulator, it's important for you to know that you can use your **requests** to directly test your Lambda function every time you update it.  To do this:
    1.  Enter an utterance in the service simulator, and copy the generated Lambda Request for the next step.

    2.  **Open your Lambda function in AWS, open the Actions menu, and select "Configure test events."**

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-2-configure-test-event._TTH_.png" />

    3.  **Select "Create New Test Event". Choose "Alexa Start Session" as the Event Template from the dropdown list.** You can choose any test event in the list, as they are just templated event requests, but using "Alexa Start Session" is an easy one to remember.  

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-3-alexa-start-session._TTH_.png" />

    4.  **Type in an Event Name into the Event Name Dialog box. Delete the contents of the code editor, and paste the Lambda request you copied above into the code editor.** The Event Name is only visible to you. Name your test event something descriptive and memorable. For our example, we entered an event name as "startSession". Additionally, by copying and pasting your Lambda Request from the service simulator, you can test different utterances and skill events beyond the pre-populated templates in Lambda.

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/4-5-4-paste-request._TTH_.png" />

    5.  **Click the "Create" button.** This will save your test event and bring you back to the main configuration for your lambda function.

    6.  **Click the "Test" button to execute the "startSession" test event.**

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-5-save-and-test._TTH_.png" />

        This gives you visibility into four things:

        *  **Your response, listed in the "Execution Result."**

           <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/4-5-5-1-execution-result._TTH_.png" />

        *  **A Summary of the statistics for your request.** This includes things like duration, resources, and memory used.

           <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-5-2-summary._TTH_.png" />

        *  **Log output.**  By effectively using console.log() statements in your Lambda code, you can track what is happening inside your function, and help to figure out what is happening when something goes wrong.  You will find the log to be incredibly valuable as you move into more advanced skills.

           <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-5-3-log-output._TTH_.png"/>

        *  **A link to your [CloudWatch](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:) logs for this function.**  This will show you **all** of the responses and log statements from every user interaction.  This is very useful, especially when you are testing your skill from a device with your voice.  (It is the "[Click here](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:)" link in the Log Output description.)

7.  **Other testing methods to consider:**

    *  [Echosim.io](https://echosim.io) - a browser-based Alexa skill testing tool that makes it easy to test your skills without carrying a physical device everywhere you go.
    *  [Unit Testing with Alexa](https://github.com/alexa/alexa-cookbook/tree/master/testing/postman/README.md) - a modern approach to unit testing your Alexa skills with [Postman](http://getpostman.com) and [Amazon API Gateway](http://aws.amazon.com/apigateway).

8.  **If your sample skill is working properly, you can now customize your skill.**


**Conclusion:**

🏆 Congratulations 🏆, at this point you've built a functional skill!!! Now we are
going to add support for a new slot to be elicited by dialog management.

## Task 5: Activate Dialog Management

**Overview:**

In this task you will activate Dialog Management. To test you will want to use
a device or [echosim.io](http://echosim.io).

1.  **Turn off testing mode** The service simulator doesn't support multi-turn
interactions, so we automatically filled the slots. When you test using
echosim, or on the device, you'll want to turn off off testing with simulator mode.  
    1.  In your Lambda Function look for `let isTestingWithSimulator = true;`
    2.  Change it to `let isTestingWithSimulator = false;`
2.  **Make the slots required**
    1.  **Go to the [Amazon Developer Portal](http://developer.amazon.com)** click on **PetMatchIntent**.
    2.  To the left you will see the list of **Intent Slots**  
        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p1-dm-intent-slots._TH_.png" height="60%" width="60%" />
    3.  **Click on the checkbox next to the size slot**. This will make the slot required which activates Dialog Management.
    If the user doesn't provide the size slot, your skill automatically prompt the user, however, we're not done yet. We still
    have to add prompts to the VUI that the skill will use to prompt the user.
    4.  **Click on size** and the size slot should appear.  
        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p1-dm-intent-slots-required._TH_.png" height="60%" width="60%" />  
        On this page you will need to add **prompts** and **utterances**:

        *  **Prompts**
            These are the prompts that your skill will use to automatically prompt the user for the selected slot.  Enter some prompts you can use the screenshot for reference.
            <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p1-dm-prompts._TTH_.png"  height="60%" width="60%" />
        *  **Utterances**
            The utterances are how the user will respond to the prompt and are based on the current slot.
            For example, "{size}" will allow the user to fill the slot by saying, "medium". "{size} size" will allow the user to say "medium size" while your slot is filled with "medium".
            One nice feature is that you can provide multiple slots per utterance.
            "{I_Want} {article} {size} {temperament} to {energy}" will allow the user to provide you with all the slot data you need for the **PetMatchIntent**. You should try to cover all the combinations for each required slot's utterances so the
            user doesn't have to repeat the same answer over and over.  

            <img src="https://raw.githubusercontent.com/gsandoval/skill-sample-nodejs-petmatch/master/instructions/assets/utterances.png" />
    5.  **Test your new required slot**  
    Open up [echosim.io](http://echosim.io) in a new tab and Say, "Alexa, tell pet match I want a dog to play fetch with". Since you didn't give it the size slot, the skill will prompt you for the size. At this point the call to the Pet Match API will fail so we wont find a match. We need collect the two remaining required slots.
    6.  **Repeat the steps 3 through 5** for the **temperament**, and **energy** slots.
3.  **Test the Skill**
    *  Say, "Alexa, open pet match".
    *  Answer the prompts.


**Conclusion:**

After completing the above:

*  **size**, **temperament**, and **energy** are marked required.
*  Model Saves and Builds.
*  Your skill prompts you for missing slots
*  Your skill returns a match.

If so, then 🏆 congratulations! 🏆 You've finished Part 1!

## Extra Credit

* **Add more utterances to each of your required slots** When using Dialog Management,
the more sample utterances you have per slot the more flexible your VUI
becomes. Your user isn't limited to only provide one slot at a time. If alexa prompts
the user for the **size** slot by saying "There are tiny, small, medium, and large
dogs which would you like?", but the user says, "I want a big family dog to play fetch
with", only the **size** slot will be filled but you missed  the **temperament**, and **energy** slots. Since those are required, the user will be asked to give the same information again. If you add "{I_Want} {article} {size} {temperament} {pet} to {energy}" to **size** slot's, utterances all of the required slots will be filled. For each of your required slots add more utterances.

[![Next](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/button-next._TTH_.png)](./2-entity-resolution.md)
