import sys
import fitz # PyMuPDF
doc = fitz.open(sys.argv[1])
text = ""
for page in doc:
    text += page.get_text()

with open("resume_text.txt", "w", encoding="utf-8") as f:
    f.write(text)
