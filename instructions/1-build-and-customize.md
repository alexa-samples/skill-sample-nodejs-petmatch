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

**Overview:**

In this step you will need your <a href="https://developer.amazon.com" 
target="_blank">Amazon Developer</a> Account. You will login to the developer 
portal and create the skill and VUI. For now you'll use the provided interaction
model, to create the VUI. Later on in Task 5, you will update the VUI add by making
the slots required and adding prompts for each slot.

There's two parts to an Alexa Skill. The first part is the 
<a href="https://developer.amazon.com/docs/custom-skills/define-the-interaction-model-in-json-and-text.html" 
target="_blank">Voice User Interface (VUI)</a> This is where you define the 
interaction model for your skill. There's no coding necessary. You simply define
the utterances, slots, and map them to an intent. When your skill is invoked, 
the user's input is processed and bundled into a JSON object that is passed to 
your Lambda Function, which you will create in 
[Task 2: Create the Lambda Function](#task-2-create-the-lambda-function).

1.  **Go to the [Amazon Developer Portal](https://developer.amazon.com/home.html) and sign in.** </br>(If you don't already have an account, you will be able to create a new one for free.)

2.  **Once you have signed in, click the Alexa button at the top of the screen.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-2-alexa-button._TTH_.png" />

3.  **On the Alexa page, choose the "Get Started" button for the Alexa Skills Kit.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-3-alexa-skills-kit._TTH_.png" />

4.  **Select "Add A New Skill."** This will get you to the first page of your 
new Alexa skill.

    <a href="https://developer.amazon.com/edw/home.html#/skill/create/" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-4-add-a-new-skill._TTH_.png" /></a>

5.  **Fill out the Skill Information screen.**  Make sure to review the tips we provide below the screenshot.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p1-skill-information._TTH_.png" />

    ### Skill Information Tips
    1.  **Skill Type** For this skill, we are creating a skill using the Custom Interaction Model.  This is the default choice.

    2.  **Language** Choose the first language you want to support.  You can add additional languages in the future, but we need to start with one.  (This guide is using English (U.S.) to start.)

    3.  **Name** This is the name that will be shown in the Alexa Skills Store.

    4.  **Invocation Name** This is the name that your users will need to say to start your skill.  For this skill, use **pet match**. We have provided some common issues developers encounter in the list below, but you should also review the entire 
    <a href="https://developer.amazon.com/docs/custom-skills/choose-the-invocation-name-for-a-custom-skill.html#cert-invocation-name-req" 
    target="_blank">Invocation Name Requirements</a>.

        | Invocation Name Requirements | Examples of incorrect invocation names |
        | ---------------------------- | -------------------------------------- |
        | The skill invocation name must not infringe upon the intellectual property rights of an entity or person. | korean air; septa check |
        | Invocation names should be more than one word (unless it is a brand or intellectual property), and must not be a name or place | horoscope; trivia; guide; new york |
        | Two word invocation names are not allowed when one of the words is a definite article, indefinite article, or a preposition | any poet; the bookie; the fool |
        | The invocation name must not contain any of the Alexa skill launch phrases and connecting words.  Launch phrase examples include "launch," "ask," "tell," "load," and "begin."  Connecting word examples include "to," "from," "by," "if," "and," "whether." | trivia game for star wars; better with bacon |
        | The invocation name must not contain the wake words "Alexa," "Amazon," "Echo," or the words "skill" or "app." | hackster initial skill; word skills |
        | The invocation name must be written in each language you choose to support.  For example, the German version of your skill must have an invocation name written in German, while the English (US) version must have an invocation name written in English. | kitchen stories (German skill) |

    5.  **Audio Player** We won't be using any audio files, so you can select **No** for this option.
    6.  **Video App** We won't be using any video either, so you can select **No** for this option. 
    7.  **Render Template** We wont be rendering anything to the echo show's display. Select **NO**.  
    **Note:** Later, if you decide to add support for the echo show, you will need to come back to this screen and turn render template on.
4.  **Click the Save button.**
5.  **Click the Next button** to move to the Interaction Model.
6.  Click on the **Launch Skill Builder** (Beta) button. This will launch the 
new Skill Builder Dashboard.

    ![Launch Skill Builder](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-7-skill-builder-launch._TTH_.png)

7.  Click on the "Code Editor" item under **Dashboard** on the top left side of 
the skill builder.

8.  In the textfield provided, replace any existing code with the code provided 
in the <a href="../casestudy/interaction-model-part1.json">Interaction Model</a>, then click 
"Apply Changes" or "Save Model".

9.  When your interaction model builds successfully, click on the 
**Configuration** button to move on to Configuration. In our next step of this 
guide, we will be creating our Lambda function in the AWS developer console, but 
keep this browser tab open, because we will be returning here on 				
[Task 3: Connect VUI to your Lambda Function](#task-3-connect-vui-to-your-lambda-function).
     ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-13-skill-builder-configuration.png)

     If you get an error from your interaction model, check through this list:

     *  **Did you copy & paste the provided code into the appropriate boxes?**
     *  **Are you missing any opening or closing braces?**
     *  **Did you accidentally add any characters to the Interaction Model or Sample Utterances?**

**Conclusion:**

At this point there should be check marks next to **Skill Information** and 
**Interaction Model**.

Does your left-hand navigation look like this?

<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/configuration-tab-sb._TTH_.png" />

If so, 🏆 congratulations! 🏆 You've completed Task 1! You
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

5.  **Choose the blueprint named "alexa-skill-kit-sdk-factskill".** We have 
created a blueprint as a shortcut to getting everything set up for your skill. 
You can search for a blueprint using the provided search box.  This blueprint 
adds the alexa-sdk to your Lambda function so that you don't have to upload it 
yourself.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p1-blueprint._TTH_.png" />  

    **NOTE:** **Do not** click on the check box. Click on the text.

6.  **Configure your function.** This screen is where we will enter the 
important parts of our Lambda function.  These values will only ever be visible 
to you, but make sure that you name your function something meaningful.  
"PetMatch" is sufficient if you don't have another idea for a name.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-7-configure-your-function._TTH_.png" />

7.  **Set up your Lambda function role.**  If you haven't done this before, we 
have a <a href="https://github.com/alexa/alexa-cookbook/tree/master/aws/lambda-role.md" 
target="_blank">detailed walkthrough for setting up your first role for Lambda</a>.  
If you have done this before, set your **Existing role** value to 
"lambda\_basic\_execution."

8.  **Copy and paste the <a href="../lambda/custom/index.js" 
target="_blank">provided code</a> into the Lambda function code box.**  We have 
provided the code for this skill on <a href="../lambda/custom/index.js" 
target="_blank">GitHub</a>. Delete the contents of the code box, and paste the 
contents of the new code.

9. **Click the Create Function Button.**  

10. **Click on Triggers** and click **+ Add Trigger**  

11.  **Configure your trigger.** Click in the dashed box, and select Alexa Skills 
Kit from the list.  If you don't see Alexa Skills Kit in the list, jump back to 
step #3 on this page.   
    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-6-configure-your-trigger._TTH_.png" />  
    Once you have selected Alexa Skills Kit, click the **Submit** button.    

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

1.  **Go back to the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list) 
and select your skill from the list.** You may still have a browser tab open if 
you started at the beginning of this tutorial.

2.  **Open the "Configuration" tab on the left side.**

3.  **Select the "AWS Lambda ARN" option for your endpoint.** You have the 
ability to host your code anywhere that you would like, but for the purposes of 
simplicity and frugality, we are using AWS Lambda. (<a href="https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-web-service" target="_blank">
Read more about Hosting Your Own Custom Skill Web Service</a>.)  With the AWS 
Free Tier, you get 1,000,000 free requests per month, up to 3.2 million seconds 
of compute time per month. Learn more at <a href="https://aws.amazon.com/free/" 
target="_blank">https://aws.amazon.com/free/</a>.  In addition, Amazon now 
offers <a href="https://developer.amazon.com/alexa-skills-kit/alexa-aws-credits"
target="_blank">AWS Promotional Credits for developers who have live Alexa 
skills that incur costs on AWS related to those skills</a>. You can ignore setting up
geographical endpoints requests for now, and revisit if you plan to release your skill
globally.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p1-3-3-endpoint._TTH_.png" />

4.  **Paste your Lambda's ARN (Amazon Resource Name) into the textbox 
provided.** It should look similar to the screenshot above.

5.  **Leave "Account Linking" set to "No."** For this skill, we won't be using 
Account Linking, but you can learn more about <a href="https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/linking-an-alexa-user-with-a-user-in-your-system" 
target="_blank">Linking an Alexa User with a User in Your System</a>.

6.  **Skip "Permissions"** For this skill, we won't be doing anything that 
requires user consent.

7.  **Click the "Next" button to advance to the "testing" page.**

**Conclusion:**

At this point you should now have successfully linked your VUI to your Lambda 
Function.

Does your left-hand navigation look like this?

<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/configuration-tab-sb-done._TTH_.png" />

If so, 🏆 congratulations! 🏆 You have succesfully linked your VUI to your code.
You're now ready to try testing your skill! In just a few minutes you'll be able
to speak to your skill and hear a response!

## Task 4: Test

**Overview:**

In Task 1 you created the VUI, in Task 2 you created your Lambda Function and in
Task 3 you linked them together. You're now ready to test your skill! In this
task you'll learn how to do just that.

1.  **Go back to the <a href="https://developer.amazon.com/edw/home.html#/skills/list" 
target="_blank">Amazon Developer Portal</a> and select your skill from the 
list.** You may still have a browser tab open if you started at the beginning of 
this tutorial.

2.  **Open the "Test" tab on the left side.**

3.  **Understand the voice simulator.** While it's not specific to your skill, 
the Voice Simulator is a valuable testing tool for every skill. Type a word into
the box, and click the "Listen" button to hear how Alexa will pronounce it. To 
make changes to her pronunciation, use Speech Synthesis Markup Language 
[(SSML)](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference) 
to modify how Alexa will interpret text to speech. Try these examples:

    ```html
    <say-as interpret-as="number">12345</say-as>
    ```

    ```html
    <say-as interpret-as="ordinal">12345</say-as>
    ```

    ```html
    <say-as interpret-as="digits">12345</say-as>
    ```

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-3-voice-simulator._TTH_.png" />

    Return to the Voice Simulator as needed to ensure that Alexa says words and 
    phrases as you would expect.

4.  **Test your skill with the Service Simulator.** To validate that your skill 
is working as expected, use the Service Simulator.  In the **Enter Utterance**
 text box, type "open pet match"

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p1-4-service-simulator._TTH_.png" />  <!-- YOU NEED TO MAKE YOUR OWN VERSION OF THIS IMAGE.  -->

    ### Service Simulator Tips
    * After you click the "Ask [Your Skill Name]" button, you should see the 
    **Lambda Request** and **Lambda Response** boxes get populated with JSON 
    data like in the screenshot above.
    * Click the **Listen** button in the bottom right corner to hear Alexa read 
    the response.

    * If you receive a response that reads: *"The remote endpoint could not be 
    called, or the response it returned was invalid,"* this is an indication 
    that something is broken.  AWS Lambda offers an additional testing tool to 
    help you troubleshoot your skill.

5.  **Configure a test event in AWS Lambda.** Now that you are familiar with the 
**request** and **response** boxes in the Service Simulator, it's important for 
you to know that you can use your **requests** to directly test your Lambda 
function every time you update it.  To do this:
    1.  Enter an utterance in the service simulator, and copy the generated 
    Lambda Request for the next step.

    2.  **Open your Lambda function in AWS, click on the "Configure test events 
    dropdown."**

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-2-configure-test-event._TTH_.png" />

    3.  **Select "Create New Test Event". Choose "Alexa Start Session" as the 
    Event Template from the dropdown list.** You can choose any test event in 
    the list, as they are just templated event requests, but using "Alexa Start 
    Session" is an easy one to remember.  

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-3-alexa-start-session._TTH_.png" />

    4.  **Type in an Event Name into the Event Name Dialog box. Delete the 
    contents of the code editor, and paste the Service Request you copied above 
    into the code editor.** The Event Name is only visible to you. Name your 
    test event something descriptive and memorable. For our example, we entered 
    an event name as "dialogTest". Additionally, by copying and pasting your 
    Lambda Request from the service simulator, you can test different utterances 
    and skill events beyond the pre-populated templates in Lambda.

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p1-paste-request._TTH_.png" />

    5.  **Click the "Create" button.** This will save your test event and bring 
    you back to the main configuration for your lambda function.

    6.  **Click the "Test" button to execute the "dialogTest" test event.**

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p1-save-and-test._TTH_.png" />

        This gives you visibility into four things:

        *  **Your response, listed in the "Execution Result."**

           <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/4-5-5-1-execution-result._TTH_.png" />

        *  **A Summary of the statistics for your request.** This includes things like duration, resources, and memory used.

           <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-5-2-summary._TTH_.png" />

        *  **Log output.**  By effectively using console.log() statements in your Lambda code, you can track what is happening inside your function, and help to figure out what is happening when something goes wrong.  You will find the log to be incredibly valuable as you move into more advanced skills.

           <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-5-3-log-output._TTH_.png"/>

        *  **A link to your [CloudWatch](https://console.aws.amazon.com/cloudwatch/home?region=eu-west-1#logs:) logs for this function.**  This will show you **all** of the responses and log statements from every user interaction.  This is very useful, especially when you are testing your skill from a device with your voice.  (It is the "[Click here](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:)" link in the Log Output description.)

6.  **Other testing methods to consider:**

    *  [Echosim.io](https://echosim.io) - a browser-based Alexa skill testing tool that makes it easy to test your skills without carrying a physical device everywhere you go.
    *  [Unit Testing with Alexa](https://github.com/alexa/alexa-cookbook/tree/master/testing/postman/README.md) - a modern approach to unit testing your Alexa skills with [Postman](http://getpostman.com) and [Amazon API Gateway](http://aws.amazon.com/apigateway).


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
            
            <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p1-dm-utterances._TH_.png" />
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
with", only the **size** slot will be filled but you missed  the **temperament**, and **energy** slots. Since those are required, the user will be asked to give the same information again. If you add "{I_Want} {article} {size} {temperament} {animal} to {energy}" to **size** slot's, utterances all of the required slots will be filled. For each of your required slots add more utterances.

[![Next](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/button-next._TTH_.png)](./2-entity-resolution.md)