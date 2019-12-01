(function () {
	const addBookInput = document.querySelector('#addbook');
	const form = document.getElementById('add-book');
	const btn1 = document.getElementById('btn1');
	const hideBooks = document.getElementById('hide');
	const searchBook = document.getElementById('searchbook');

	const ul = document.querySelector('ul');
	let state = JSON.parse(localStorage.getItem('mybooks')) || [];
	const id = function () { return 'qwertyuio'.split('').sort(() => Math.random() - 0.5).join('') + '_' + Math.floor(Math.random() * 1000) };

	function createUI(booksdata) {
		ul.innerHTML = '';
		booksdata.forEach(book => {
			const xbut = document.createElement('button');
			xbut.textContent = 'X';
			xbut.setAttribute('data-id', book.id);
			xbut.classList.add('xbut');
			const p = document.createElement('p');
			p.setAttribute('data-id', book.id);
			const li = document.createElement('li');
			li.classList.add('liclass');
			p.textContent = book.bookname;
			p.classList.add('para1');
			li.append(p, xbut);
			ul.append(li);
			function deleteit(e) {
				state = state.filter(book => book.id != event.target.dataset.id);
				createUI(state);
				localStorage.setItem('mybooks', JSON.stringify(state));
			}
			xbut.addEventListener('click', deleteit);
			var editinput = document.createElement('input');
			editinput.classList.add('editinput');
			function editable(event) {
				li.replaceChild(editinput, p);
				if (event.target.dataset.id == book.id) {
					editinput.value = book.bookname;
					editinput.focus();
					editinput.addEventListener('keyup', ((event) => {
						if (event.keyCode == 13) {
							p.textContent = editinput.value;
							book.bookname = p.textContent;
							createUI(state);
						}
					}))
					editinput.addEventListener('blur', ((event) => {
						console.log('enter');
						p.textContent = editinput.value;
						book.bookname = p.textContent;
						createUI(state);
						localStorage.setItem('mybooks', JSON.stringify(state));
					}))
				}
			}
			p.addEventListener('dblclick', editable);
		});
		btn1.addEventListener('click', addthis);
		hideBooks.addEventListener('click', hideit);
	}

	function addthis(event) {
		event.preventDefault();
		if (addBookInput.value) {
			state.push({
				bookname: addBookInput.value,
				id: id()
			})
			createUI(state);
			localStorage.setItem('mybooks', JSON.stringify(state));
			addBookInput.value = '';
		}
	}
	function hideit(e) {
		if (event.target.checked) {
			ul.style.display = 'none';
			ul.classList.add('showall');
		}
		else ul.style.display = 'block';
	}

	function searchit(event) {
		event.preventDefault();
		var statesearched = state.filter(book => book.bookname.toLowerCase().includes(searchbook.value.toLowerCase()));
		createUI(statesearched);
	}

	searchbook.addEventListener('keyup', searchit);

	createUI(state);
	console.log(state);
})();