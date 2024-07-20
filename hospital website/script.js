let menubar = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menubar.onclick = () => {
    /*menubar.classList.toggle('fa-times');*/
    navbar.classList.toggle('active')
}
let readmore = document.querySelector('.tab');
readmore.addEventListener('click', function (e) {
    e.preventDefault();

    const contentDiv = document.getElementById('content');

    if (contentDiv.innerHTML === '') {
        contentDiv.innerHTML = `
            <p>
                The transition from traditional paper prescriptions to electronic systems offers numerous benefits.
                Paper prescriptions are prone to errors due to illegible handwriting,
                misinterpretation, and physical loss or damage. E-Prescriptions eliminate these issues by providing
                clear,
                legible, and easily accessible digital records.
                This not only enhances the accuracy of prescriptions but also reduces the administrative burden on
                healthcare providers, allowing them to focus more on patient care.
            </p>
        `;
        contentDiv.style.display = 'block';
    } else {
        contentDiv.style.display = contentDiv.style.display === 'none' ? 'block' : 'none';
    }
    readmore.remove();
});
