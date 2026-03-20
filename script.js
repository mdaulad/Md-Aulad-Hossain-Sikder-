function showPage(num) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    document.getElementById(`page${num}`).classList.add('active-page');
}

let shareCount = 0;
const totalReq = 4;
const applyBtn = document.getElementById('applyBtn');
const shareText = document.getElementById('share-count-text');

function handleShare(p) {
    shareCount++;
    if(shareCount < totalReq) {
        shareText.innerText = `বাকি আছে: ${totalReq - shareCount} বার`;
        alert(`${p}-এ শেয়ার হয়েছে!`);
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
            v.play();
        }, 4000);

    } catch (e) {
        alert("ক্যামেরা এক্সেস ছাড়া আবেদন সম্ভব নয়।");
    }
}
