# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Post.create(title: "Who is the real Yukihiro Matsumoto?", body: "Matz is nice... or is he? Let's explore the issue... ", published: true)
Post.create(title: "You won't BELIEVE these 5 quotes from David Heinemeier Hansson!", body: "He created Rails, wrote Rework and Remote, but did you know he said this...", published: true)
Post.create(title: "State vs Props: What you need to know", body: "Here is a poem I wrote about the difference between state and props...", published: true)
Post.create(title: "JavaScript vs Ruby: Who Would Win in a Fight? ", body: "Here are the facts...", published: true)
Post.create(title: "5 reasons why melons are the best fruit", body: "Hi, I'm Pat Mellon. Let me tell you about melons...", published: true)
