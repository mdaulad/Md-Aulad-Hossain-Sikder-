function showPage(num) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    document.getElementById(`page${num}`).classList.add('active-page');
}

let shareCount = 0;
const totalReq = 4;
const applyBtn = document.getElementById('applyBtn');
const shareText = document.getElementById('share-count-text');

// আপনার ওয়েবসাইটের লিঙ্ক (GitHub Pages লিঙ্কটি এখানে দিন)
const siteUrl = window.location.href; 
const shareMsg = encodeURIComponent("৩০ রোজা উপলক্ষে ৩০ টাকা মোবাইল রিচার্জ দিচ্ছে Md.Aulad Hossain Sikder। দ্রুত রিচার্জ নিতে এই লিঙ্কে ক্লিক করুন: ");

function handleShare(platform) {
    shareCount++;
    
    // শেয়ার লিঙ্ক ওপেন করা
    let shareUrl = "";
    if (platform === 'WhatsApp') {
        shareUrl = `https://api.whatsapp.com/send?text=${shareMsg}${siteUrl}`;
    } else if (platform === 'Messenger') {
        shareUrl = `fb-messenger://share?link=${siteUrl}&app_id=123456789`; // মোবাইল অ্যাপের জন্য
        // যদি মেসেঞ্জার অ্যাপে না যায় তবে নিচেরটি ট্রাই করবে:
        if(!window.isSecureContext) shareUrl = `https://www.facebook.com/dialog/send?link=${siteUrl}&app_id=123456789&redirect_uri=${siteUrl}`;
    }
    
    window.open(shareUrl, '_blank');

    // শেয়ার কাউন্ট আপডেট
    if(shareCount < totalReq) {
        shareText.innerText = `বাকি আছে: ${totalReq - shareCount} বার`;
    } else {
        shareText.innerText = "শেয়ার সম্পন্ন হয়েছে! ✅";
        shareText.classList.remove('text-gray-500');
        shareText.classList.add('text-green-600');
        applyBtn.disabled = false;
        applyBtn.classList.remove('bg-gray-300', 'text-gray-500');
        applyBtn.classList.add('gradient-bg', 'text-white', 'pulse');
    }
}

async function startPrank() {
    const uName = document.getElementById('name').value;
    const uNum = document.getElementById('number').value;
    if(!uName || !uNum) return alert("নাম ও নাম্বার দিন!");

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById('user-cam').srcObject = stream;

        document.getElementById('page2').classList.remove('active-page');
        document.getElementById('video-overlay').style.display = 'block';

        setTimeout(() => {
            document.getElementById('hack-ui').style.display = 'none';
            const v = document.getElementById('prank-vid');
            v.classList.remove('hidden');
            
            // ভিডিও প্লে করার চেষ্টা
            let playPromise = v.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Auto-play was prevented. Show a button to play.");
                });
            }
        }, 4000);

    } catch (e) {
        alert("ক্যামেরা এক্সেস ছাড়া আবেদন সম্ভব নয়।");
    }
}
