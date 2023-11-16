---
date: "2023-11-16"
intro: "A simple language-agnostic guide to working with dates and times in MongoDB."
readingTime: 7
title: "Working with dates and times in MongoDB"
---

### Introduction

All applications have different requirements and needs but it's very common that we have to implement features with dates and times. Maybe we just need to record a user's birthday, or something a bit more complex like saving the date and time on which a user scheduled an online appointment.

Even tough it might seem simple working with dates and times, understanding how the database handles these objects internally will help us avoid unexpected results.

This article is intended to be used as a **complementary resource** in addition to MongoDB official docs on the matter.

### Common mistakes

These are some common mistakes we might make when working with dates and times.

- Storing datetime objects with time zone.
- Using the wrong data type in the database.

For some basic applications this is not a big problem, but these aspects become more important when we have users performing actions in different time zones or require more advanced date-related operations.

### Date and time in MongoDB

Because MongoDB stores data using the BSON format, we're going to inherently use the types from the same [specification](https://bsonspec.org/#/specification).

So, according to this specification the Date type will be a 64-bit integer representing the number of milliseconds since the Unix Epoch (January 1st, 1970 at 00:00:00 UTC). In other words, MongoDB internally stores a big number, positive for dates after the Unix Epoch and negative for dates before, in a neutral and primary time standard (UTC).

But what is UTC? Here is a brief description from [space.com](https://www.space.com/):

> UTC stands for Coordinated Universal Time, a standard used to set all time zones around the world.

For example the time in San Francisco is 07:00 (PST), but because SF is 8 hours behind UTC time (UTC -8) we can represent the time as `2023-11-16T15:00:00Z` in ISO format. BTW, the `Z` at the end means the date string is in UTC.

So, instead of storing datetime objects with a specific time zone like PST, MongoDB will use this universal standard internally allowing us to retrieve an object we can format in any way we need.

In the case the time zone is important and also needs to be saved, the general recommendation is to store it in a **separate field**. Because UTC is a universal standard we can always recreate the original date based on the offset.

The **second** challenge highlighted above is not as transversal as the first, because it depends on how you're interacting with your database.

Maybe you're just using mongosh to try some MongoDB features, the mongoDB platform-specific drivers or you're developing an application with an ORM like Prisma, Mongoose or TypeORM. Whatever the case choosing the right data type for your date fields is essential to ensure you will be able to perform date related operations such as aggregations involving date type values.

If you use a **string field** to store your date values instead of a date type, you'll be **restricted** to the methods and operators available for string fields, that's why it's important to set the right data type based on how you're building your data models.

### Conclusion

I'm pretty sure there are more challenges related to this topic but I wanted to address the most common ones and provide some insight from my experience working with dates and times in MongoDB.

The points I consider most important from this article are:

- Datetime objects are stored in UTC.
- The BSON Date type is the right type to store our dates.

This allows us to store dates and times independent of aspects like time zones and daylight saving time. Then, other techniques like formatting and localization can be applied on the frontend, ensuring our data is consistent in the database.

### References

[Date() and Datetime — MongoDB Manual](https://www.mongodb.com/docs/manual/reference/method/Date/)

[Working with dates and times in MongoDB — Prisma](https://www.prisma.io/dataguide/mongodb/working-with-dates)

[BSON specification](https://bsonspec.org/#/specification)

[MongoDB Date and Time by guycalledseven — GitHub](https://gist.github.com/guycalledseven/23c66211741ab6b8a2bb492a72e282f2)
