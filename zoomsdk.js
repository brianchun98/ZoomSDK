ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()
ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.5.0/lib', '/av')

var sdkKey = "UzYfc23HO7wy1IzRvdiL38gaU7dtdwyhZDSB"
var sdkSecret = "qAC0oBzFOX150LlyrTlrlEwsbI36Jbs3ZfiO"
var meetingNumber = "98423615025"
var passWord = "123456"
var userName = "Brian Chun"
var zakToken = "eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6ImRkdXhBYmw4VHpHTGZYMzJUT0RoR2ciLCJpc3MiOiJ3ZWIiLCJzayI6IjU5Nzk0MTk0MDg0OTc1NjM1MjYiLCJzdHkiOjEwMCwid2NkIjoiYXcxIiwiY2x0IjowLCJleHAiOjE2NTkzMzAzMTksImlhdCI6MTY1OTMyMzExOSwiYWlkIjoidDZPWW82d29RLW1FSUI3b25ZX3BFQSIsImNpZCI6IiJ9.Cz-Sqc12a5QL5AGdR_Z5ESf00MREJ_aql8WkeZWaees"
var role = 0

// generate signature based on parameters (SDK JWT)
function generateSignature(sdkKey, sdkSecret, meetingNumber, role) {
 	const iat = Math.round((new Date().getTime() - 30000) / 1000)
	const exp = iat + 60 * 60 * 2
	const oHeader = { alg: 'HS256', typ: 'JWT' }
	const oPayload = {
   		sdkKey: sdkKey,
   		mn: meetingNumber,
   		role: role,
   		iat: iat,
   		exp: exp,
   		appKey: sdkKey,
   		tokenExp: iat + 60 * 60 * 2
	}
	const sHeader = JSON.stringify(oHeader)
	const sPayload = JSON.stringify(oPayload)
	const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret)
	return sdkJWT
}

var signature = generateSignature(sdkKey, sdkSecret, meetingNumber, role)

ZoomMtg.init({
  leaveUrl: 'https://google.com', //url to redirect to after ending meeting/error joining meeting 
  success: (success) => {
    console.log(success)

    ZoomMtg.join({
  		sdkKey: sdkKey,
  		signature: signature, // role in SDK Signature needs to be 1 to start meeting
  		meetingNumber: meetingNumber,
  		passWord: passWord, // if empty string "", only waiting room is used
  		userName: userName, // name to be displayed in meeting
  		zak: zakToken, // the host's zak token, pass only if role == 1
  		success: (success) => {
   		 console.log(success)
  		},
  		error: (error) => {
  		  console.log(error)
  		}
	})
  },
  error: (error) => {
    console.log(error)
  }
})




