import Audio from '#/models/audio'
import AutoGeneratedPlaylist from '#/models/autoGeneratedPlaylist'
import cron from 'node-cron'

// cron.schedule("*/2 * * * * *", () => {
//     console.log("I m running")
// })

const generatePlaylist =async () => {
    const result = await Audio.aggregate([
        {$sort: {likes: -1}}, 
        {
            $sample: {size: 20},
          },
        {$group: {
          _id: "$category",
          audios: {$push: "$$ROOT._id"}
        }},
      ])
  
      result.map(async (item) => {
        await AutoGeneratedPlaylist.updateOne(
          {title: item._id},
          {$set: {items: item.audios}},
          {upsert: true}
        )
      }) 
}

cron.schedule("0 0 * * *", async() => {
    // this will run on every 24 hrs
    await generatePlaylist()
})