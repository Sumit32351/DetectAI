# What is detectAI ? 

DetectAI is a open-source tool designed to detect AI generated content on StackOverflow.

It uses CodeBERT in the background to predict AI generated code. 




# Installation

## From browser

1. Download the zip folder from the CODE button on top right side.

2. Unzip the folder.

## Using github on command line

1. Go th the directory you want to clone the repository and type 
```bash
    git clone https://github.com/harsh-g1/DetectAI
```



# HOW TO USE 

### ACTIVATING THE LOCALHOST (macOS)

1. Go to the terminal and add the path where the folder is downloaded. 

2. Dowload the dependencies with
```bash
    pip install -r requirements.txt
```
3. Run this command to download and save the model
```bash
    mkdir -p models/codebert
python3 -c "from transformers import AutoModelForSequenceClassification, AutoTokenizer; model = AutoModelForSequenceClassification.from_pretrained('microsoft/codebert-base'); tokenizer = AutoTokenizer.from_pretrained('microsoft/codebert-base'); model.save_pretrained('./models/codebert'); tokenizer.save_pretrained('./models/codebert')"

```

4. Activate the model with 
```bash
    cd backend
```
```bash
    python3 app.py
```
   This activates the flask server. Now the model is ready to receive requests.



# LOADING THE EXTENSION

1. Go to (chrome://extensions/)

2. Enable developer mode.

3. Go to the folder where you unzipped the downloaded folder(say we named it DetectAI). Go into this folder, where we will see multiple folder like backend, extensions etc. Choose the extension folder and load it.


# USING THE EXTENSION

1. Go to Stack Overflow and locate any page that has some code. Then on the top right, click on the extensions icon. Then select DetectAI. Then a popup comes form which we can select Analyse button.

2. We will see the results on the top of each answer's code section.


![Chrome](https://img.shields.io/badge/browser-Chrome-blue)
![Made with CodeBERT](https://img.shields.io/badge/model-CodeBERT-orange)


# VIDEO DEMONSTRATION
[Link Text] ()
[Link Text] ()
