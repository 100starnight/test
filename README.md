# UChicago Mock Papal Election Sankey Diagram
This repo contains basic code to build a sankey diagram - while I eventually plan to make it generic/polymorphic enough that it could be used for any set of data,
right now it is highly tailored to the use case of tracking the votes from the University of Chicago's mock papal elections.
### IF YOU ARE A CURRENT STUDENT:
*DO NOT LOOK AT THE DATA FROM PAST ELECTIONS!!!*</br>
I promise you that your simulation will be different from the ones that have data here,
and as a former student myself I can gaurantee that it is so much more impactful and fun to find all of this out in character than from looking at old graphs.
### What is a Sankey Diagram?
A Sankey Diagram is a data visualization used to show flow between different groups;
in this case, I'm using it to show voter movement between different candidates over time.
### Technical details:
This is an extreemly minimalist wrapper around [Google's Sankey Diagram code](https://developers.google.com/chart/interactive/docs/gallery/sankey)
that is tailored to work past some of the issues I've had with that library.
For example: the raw library doesn't allow for nodes of the same name,
but mine does by padding each name with spaces.
Nothing fancy, but still hopefully helpful!
