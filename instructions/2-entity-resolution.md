# Conversation and Memory

[![Part 1: Build and Customize](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/tutorial-page-marker-1-done._TTH_.png)](./1-build-and-customize.md)[![Entity Resolution](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/tutorial-page-marker-2-on._TTH_.png)](./2-entity-resolution.md)[![Memory](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/tutorial-page-marker-3-off._TTH_.png)](./3-memory.md)

## Part 2: Entity Resolution

**Overview:**

In part 2 you will learn how to make your VUI more robust by mapping synonyms to
your slot values. Synonyms are great for adding flexibility to your skill's VUI, 
however, sometimes a synonym can map to more than one value causing ambiguity. 
You'll learn how to identify when a synonym has been mapped to more than one 
value and how to use dialog management to disambiguate through clarifying with 
the user. Lastly, you'll leverage synonyms for front-end error detection. This 
allows you to leverage the power of Alexa's natural language understanding to 
determine if the user gave you valid input. 

**Note:** If your Interaction Model for some reason doesn't build or if you're
stuck enabling dialog management, you can use this [Interaction Model](../casestudy/interaction-model-part2.json).

**Objectives:**

After completing this lab, you will be able to:

*  Add Synonyms
*  Prompt the User for clarification when a synonym maps to more than one value.
*  Configure and leverage synonyms to validate input.

## Task 1: Add Synonyms

**Overview:**

In this task, you will learn how to add synonyms to your custom slot types. 

1.  Go to the skill builder.
2.  In **Slot Types** Menu find **sizeType** and click on it.  
    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p2-slot-types-size._TTH_.png" width="40%" height="40%" />    
    
    You'll see a table with three columns, **VALUE**, **ID** AND **SYNONYMS**.
3.  For each **VALUE**, add the following synonyms:  
    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p2-slot-value-synonyms._TTH_.png" width="60%" height="60%" />   
4.  Once you've entered all the synonyms, click on **Save Model**, then click 
    **Build Model**.  

    <img src ="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-12-skill-builder-build-save-model._TTH_.png" />  
    
    **Note:** Every time you make a change to the VUI, you will need to click 
    **Build Model**. 
5.  Now it's time to test your skill. Say "Alexa, open pet match" and when asked
    for your **size** preference answer using one of the **synoynms** that you 
    just entered.
6. Have fun with your VUI and try adding new synonyms for all of your slots.

**Conclusion:**

Did your skill resolve the synonym to the value properly? Did you get a match? 
If so, 🏆congratulations🏆! You've completed this task! How does this work? 
There's two pieces at play here. Through your VUI, you've provided training data
to the Alexa engines to map these **synonyms** to the **values**. In your Lambda 
Function, you're given a lot of information about your slots including whether it
was a successful match or not. If you have a successful match you'll see 
`ER_SUCCESS_MATCH` likewise, if no match you'll see `ER_SUCCESS_NO_MATCH`. This
allows you to determine if the user said something that resolved to the 
**value**, yet isn't a **synonym**. The extra credit section will challenge you 
to think about how to handle an `ER_SUCCESS_NO_MATCH`. In the next section,
you'll learn how to handle a **synonym** that resolves to more than one
**value**.

## Task 2: Disambiguation

**Overview:**

For this task, you will be adding a **synonym** that maps to more than one 
**value**. When the user says that **synonym** your skill will need to seek 
clarification from the user. 

1.  Go to the skill builder.
2.  In **Slot Types** Menu find **sizeType** and click on it.  
    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p2-slot-types-size._TTH_.png" width="40%" height="40%" />    
    
    You'll see a table with three columns, **VALUE**, **ID** AND **SYNONYMS**.  
3.  In the **SYNONYMS** box for **tiny** and **small** add **mini**.  
    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p2-slot-value-synonym-mini._TTH_.png" width="40%" height="40%" />  
4.  Once you've added **mini** as a **synonym** to both **tiny** and **small**,
    click on **Save Model**, then click **Build Model**.    
    <img src ="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-12-skill-builder-build-save-model._TTH_.png" />  
    Once your skill has finshed buidling, you're ready to test.
5.  Test your skill by saying, "Alexa ask pet match for a mini dog". 

**Conclusion:**

Did the skill prompt you for clarification? If so, 🏆congratulations!🏆 You've 
finished this task! In your Lambda Function, take a close look at 
`disambiguateSlot()`. It loops through all the slots to identify matches with
more than one value. If the status code for the slot is `ER_SUCCESS_MATCH`, and 
the **values** array is greater than 1 then you know that the synonym resolves 
to more than one value. To ask the user for clarification, you build up a prompt
and then emit `:elicitSlot`.

In the next section you'll learn how to use the Entity Resolution to validate 
input.

## Task 3: Front-end Data Validation

**Overview:**

For this task, you'll learn how to use Entity Resolution to validate input. Pet
Match is a skill designed to match the user with a real pet, however, there's 
nothing stopping the user from asking for a mythical creature such as a unicorn,
or a dragon. 

1.  Go to the skill builder.
2.  In **Slot Types** Menu find **petType** and click on it.  
    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p2-slot-types-pet._TTH_.png" width="40%" height="40%" />    
    
    You'll see a table with three columns, **VALUE**, **ID** AND **SYNONYMS**.  
3.  In the box that says, **Enter a new value for this slot type...** type 
    **mythical_creatures** and either click the **+** button or hit the 
    **enter key** on your keyboard.
4.  Add the following **syononyms** to your **mythical_creatures** value.  
    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p2-mythical-creatures._TTH_.png" width="60%" height="60%" />
    *  **dragon**
    *  **unicorn**
    *  **phoenix**
    *  **troll**
    *  **mermaid**
    *  **gnome**
    *  **ghoul**
    *  **fairy**
    *  **chimera**
    *  **cerberus**
5.  Once you've added all the **synonyms** click on **Save Model**, then click 
    **Build Model**.    
    <img src ="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-12-skill-builder-build-save-model._TTH_.png" />  
    Once your skill has finshed buidling, you're ready to test.
6.  Test your skill by saying, "Alexa, ask pet match for a dragon"

**Conclusion:**

Did the skill answer with a funny response? If so then 🏆congratulations!🏆 
You've finished task 3 and part 2 of the workshop! Great job!

We were able to identify that the user said a mythical creature because we added
them as **synonyms** to our VUI. In the Lambda Function we are checking 
`slotValues.pet.resolved`. Since it was equal to 'mythical_creatures' rather
than a normal animal we halt analysis and return a random funny response. 


## Extra Credit

*  **Handle Negatives**  
  The Pet Match VUI has been preconfigured with a slot called **I_Want** which
  captures the various ways that a user might declare their desire for a pet.
  What if the user says, "I don't want a high energy dog"? Currently Pet Match 
  will ignore the **don't** and match the user with a **high** energy dog. If
  you modify the **IWantType** you can capture whether the user said, "do want" 
  or "don't want". Modify the **IWantType** by adding **do want** and **don't want** 
  values. Add synonyms like **i want** and **my favorite is**, etc. to **do want**. 
  Add synonyms to **don't want** like **i don't want** and **i hate**. Upon doing so
  your VUI will be able to distinguish between **do want** and **don't want**. 
  In your lambda function, you can check **IWant** and modify your search query 
  accordingly. The images below should help you get started. You can also use a 
  preconfigured version of the [interaction model](../casestudy/interaction-model-extra-credit-do-dont-want.json). Check the screenshots below to see how the  **IWantType** 
  should appear after you add the **do want** and **don't want** slot values and their
  synonyms.

  <table>
    <tr>
      <td>Preconfigured IWantType</td>
      <td>IWantType after modification</td>
    </tr>
    <tr>
      <td><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p2-iwant-positive._TTH_.png" /></td>
      <td><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p2-iwant-positive-negative._TTH_.png" /></td>
    </tr>
  </table>

*  **Log ER\_SUCCESS\_NO\_MATCH:**   
  When you get an **ER\_SUCCESS\_NO\_MATCH** 
  your slot received a value, but there was no match. There's a possibility 
  that the value is valid, but you didn't account for it by adding a 
  **synonym**. You should log a **ER\_SUCCESS\_NO\_MATCH** so you can add 
  missing **syonyms** to your VUI. Come up with a way to log 
  **ER\_SUCCESS\_NO\_MATCH** for all slots.
  
[![Next](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/button-next._TTH_.png)](./3-memory.md)