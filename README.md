<h3>Assumptions</h3>
1. Message can have only key-value pair.
2. If given timestamp, we are to return latest message compare to given timestamp.
Example,
````
--|----|------|-------------
#  Key  Value  Timestamp
--|----|------|-------------
1. Key1 Value1 6pm
2. Key1 Value2 6.05pm
3. Key1 Value3 6.10pm
--|----|------|-------------
````
- If given key "Key1" and timestamp "6.07pm", it would return value "Value3",
since from timestamp "6.07pm", "Value3" is the 1st latest.
- If given key "Key1" and timestamp "6.05pm", it would return value "Value2",
since from timestamp "6.05pm", "Value2" is the 1st latest.
  

<h3>Time limit</h3>
Afraid, I had to set hard limit to how much further I could go in solution with given Singtel workload. 
Also have already taken a week to begin with solution, wish not to delay further. 

1. With testing, I could go further add Gatling for performance test.
2. More detailed Unit tests covering "/startup", "/middleware" and other modules.
3. Swagger document explaining the API.
