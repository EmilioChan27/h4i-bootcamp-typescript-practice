import dbConnect from '../../../lib/dbConnect'
import getVolunteerAccountModel from '../../../models/VolunteerAccount'

// right now a lot of the data is hard-coded
export default async function handler(req, res) {
    await dbConnect()
    const VolunteerAccountModel = getVolunteerAccountModel()
    switch (req.method) {
        case 'POST':
            try {
                var maxAlpId
                await VolunteerAccountModel.findOne().sort('-alp_id').then(account => {
                    maxAlpId = account.alp_id
                })
                console.log(maxAlpId)
                const {email, password, fname, lname, location} = JSON.parse(req.body)
                const newVolunteerAccount = new VolunteerAccountModel({
                    fname: fname,
                    lname: lname,
                    alp_id: maxAlpId+1,
                    ageBucket: 1,
                    email: email,
                    pwhash: password,
                    location: location,
                    dateJoined: Date.now(),
                    allDrives: 0,
                    badges: 0
                })
                const account = await newVolunteerAccount.save()
                res.status(200).json({success: true, data: account, alp_id: newVolunteerAccount.alp_id}) 
                break
            } catch (error) {
                res.status(400).json({ success: false, data: error })
                break
            }
        case 'PATCH':
            try {
               const {alp_id, email, location} = JSON.parse(req.body)
               const modifiedVolunteerAccount = await VolunteerAccountModel.findOneAndUpdate(
                {alp_id: alp_id}, 
                {email: email, location: location}, {
                    new: true,
                }
                )
               res.status(200).json({success: true, data: modifiedVolunteerAccount}) 
               break
            } catch (error) {
                console.log(error)
                res.status(400).json({success: false, data: error})
                break
            }
        case 'DELETE':
            try {
                const {alp_id} = JSON.parse(req.body)
                const account = await VolunteerAccountModel.delete({alp_id: alp_id})
                const deletedVolunteerAccount = await account.save()
                res.status(200).json({success: true, data: deletedVolunteerAccount})
                break
            } catch (error) {
                res.status(400).json({success: false, data: error})
                break
            }
        case 'GET':
            try {
                const email = req.query.email
                const volunteerAccount = await VolunteerAccountModel.findOne({email: email})
                console.log(volunteerAccount)
                res.status(200).json({success: true, data: volunteerAccount})
                break
            } catch (error) {
                res.status(400).json({success: false, data: error})
            }
    }

}
