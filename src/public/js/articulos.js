window.onload = function() {
  let imgPreview = document.querySelector('.img__view__preview');
  if(imgPreview) {
    imgPreview.src = imgPreview.src;
    imgPreview.onerror = function() {
      this.src = '/img/placeholder-image.png';
    }
  }
}

$(document).ready(function() {
  if(location.href.includes('&id=')) {
    if(imgPreviewStand) {
      sessionStorage.imageHistory = imgPreviewStand;
    } else {
      delete sessionStorage.imageHistory;
    }
  }
 
  if($('#desktop__select').is(':checked')) {
    $('.inputUpLink').attr('disabled', 'disabled');
    $('.inputUpFile').attr('style', 'opacity: 1;');
    $('#fileForm').removeAttr('disabled');
  } else {
    $('.inputUpFile').attr('style', 'opacity: 0.6;');
    $('.inputUpLink').removeAttr('disabled');
    $('#fileForm').attr('disabled', 'disabled');
  }
  $('body').on('change', '[name="radio__selectUpload"]', function() {
    if(this.id == 'desktop__select') {
      $('.inputUpLink').attr('disabled', 'disabled');
      $('.inputUpFile').attr('style', 'opacity: 1;');
      $('.inputUpLink').val('');
      $('#fileForm').removeAttr('disabled');
    } else {
      $('.inputUpFile').attr('style', 'opacity: 0.6;');
      $('.inputUpLink').removeAttr('disabled');
      $('.inputUpFile').val(null);
      $('#fileForm').attr('disabled', 'disabled');
    }
    // $('.img__view__preview').attr('src', '/img/placeholder-image.png');
  });

  $('body').on('click', '.menu__bars', function() {
    $('.sidebar__page').toggleClass('d-none');
    $('.block__chain__container').toggleClass('d-none');
    $('body').toggleClass('ov-hidden');
  });

  $(document).on("click.sidebar__page",function(event) {
    var target = $(event.target);   
    // console.log($('.grab_audio').hasClass('d-none'));
    if(!$('.sidebar__page').hasClass('d-none')) {
      if (!target.closest(".sidebar__page").length && !target.closest(".menu__bars").length) {
        // closeMenu(function() {
        //     $(document).off("click.grab_audio");
        // });
        $('.sidebar__page').addClass('d-none');
        $('.block__chain__container').addClass('d-none');
        $('body').removeClass('ov-hidden');
      }      
    }
  });

  $(document).on("click.logout__user",function(event) {
    var target = $(event.target);   
    // console.log($('.grab_audio').hasClass('d-none'));
    if(!$('.logout__user').hasClass('d-none')) {
      if (!target.closest(".logout__user").length && !target.closest(".user__config").length) {
        // closeMenu(function() {
        //     $(document).off("click.grab_audio");
        // });
        $('.logout__user').addClass('d-none');
      }      
    }
  });

  function renderImage(formData, $file) {
    const file = formData.get('archivo');
    const image = URL.createObjectURL(file);
    $file.setAttribute('src', image);
  }

  $('body').on('change', '#fileForm', function() {
    const $form = document.querySelector('#form__body') || document.querySelector('#form__body__edit');
    const formData = new FormData($form);
    renderImage(formData, document.querySelector('.img__view__preview'));
  });

  $('body').on('click', '.user__config', function() {
    $('.logout__user').toggleClass('d-none');
  });

  $('body').on('keyup change paste', '.inputUpLink', function() {
    let imgPreview = document.querySelector('.img__view__preview');
    if(this.value == '') {
      imgPreview.src = sessionStorage.imageHistory;
    } else {
      setTimeout(() => {
        imgPreview.src = this.value;
        imgPreview.onerror = function() {
          this.src = '/img/placeholder-image.png';
        }
      }, 100);
    }  
  });

  $('body').on('submit', '#form__body__edit', async function(e) {
    e.preventDefault();
    const form = this;
    const formData = new FormData(form);
    let newUrlImage = '';
    $('.block__chain__container').removeClass('d-none');
    $('.loader__page').removeClass('d-none');
    $('body').addClass('ov-hidden');
    if($('.img__view__preview').attr('src') == '/img/placeholder-image.png') {
      formData.set('image', null);
    } else {
      if($('.inputUpLink').val() == '') {
        let responseImg = await fetch('/saveImage', {
          method: 'POST',
          body: formData
        });
        let resImg = await responseImg.text();
        newUrlImage = resImg;
        // console.log(resImg);
      } else {
        let payload = {fileSrc: $('.img__view__preview').attr('src')};
        let data = new FormData();
        data.append( "json", JSON.stringify( payload ) );
        let responseImgExtern = await fetch('/saveImageExtern', {
          method: 'POST',
          body: data
        });
        let resImgExtern = await responseImgExtern.text();
        newUrlImage = resImgExtern;
        // console.log(resImgExtern);
      }
      formData.set('image', newUrlImage);
    }
    let id__item = this.dataset.idItem;
    let urlDestino = `/updateArticle/${id__item}`;
    let response = await fetch(urlDestino, {
      method: 'POST',
      body: formData
    });

    let res = await response.json();
    // console.log(res);
    if(res) {
      $('.block__chain__container').addClass('d-none');
      $('.loader__page').addClass('d-none');
      $('body').removeClass('ov-hidden');
      location.href = '/listArticles';
    }
  });

  $('body').on('submit', '#form__body', async function(e) {
    e.preventDefault();
    const form = this;
    const formData = new FormData(form);
    let newUrlImage = '';
    $('.block__chain__container').removeClass('d-none');
    $('.loader__page').removeClass('d-none');
    $('body').addClass('ov-hidden');
    if($('.img__view__preview').attr('src') == '/img/placeholder-image.png') {
      formData.set('image', null);
    } else {
      if($('.inputUpLink').val() == '') {
        let responseImg = await fetch('/saveImage', {
          method: 'POST',
          body: formData
        });
        let resImg = await responseImg.text();
        newUrlImage = resImg;
        // console.log(resImg);
      } else {
        let payload = {fileSrc: $('.img__view__preview').attr('src')};
        let data = new FormData();
        data.append( "json", JSON.stringify( payload ) );
        let responseImgExtern = await fetch('/saveImageExtern', {
          method: 'POST',
          body: data
        });
        let resImgExtern = await responseImgExtern.text();
        newUrlImage = resImgExtern;
        // console.log(resImgExtern);
      }
      formData.set('image', newUrlImage);
    }
    let urlDestino = '/saveArticle';
    let response = await fetch(urlDestino, {
      method: 'POST',
      body: formData
    });

    let res = await response.json();
    $('.block__chain__container').addClass('d-none');
    $('.loader__page').addClass('d-none');
    $('body').removeClass('ov-hidden');
    form.reset();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // console.log(res);
  });

  $('body').on('click', 'tbody tr', function() {
    let verifyInterSelect = $(this).hasClass('selected');
    $('.selected').removeClass('selected');

    if(verifyInterSelect) {
      $(this).removeClass('selected');
    } else {
      $(this).addClass('selected');
    }
  });

  $('body').on('click', '.btnEditarArticle', function() {
    if($('.selected')[0]) {
      // let name = $('.selected').find('.name__item').text();
      // let desc = $('.selected').find('.desc__item').text();
      // let unid = $('.selected').find('.unid__item').text();
      // let marca = $('.selected').find('.marca__item').text();
      // let stock = $('.selected').find('.stock__item').text();
      // let precio = $('.selected').find('.precio__item').text();
      // let imageUrl = $('.selected').find('img').attr('src');
      let id = $('.selected').attr('data-id-item');
      location.href = `/editArticle?id=${id}`;
    } else {
      alert('Debe de seleccionar alguna fila');
    }
  });

  $('body').on('click', '.btnDeleteArticle', async function() {
    if($('.selected')[0]) {
      $('.block__chain__container').removeClass('d-none');
      $('.loader__page').removeClass('d-none');
      $('body').addClass('ov-hidden');
      let responseDelete = await fetch(`/deleteArticle/${$('.selected').attr('data-id-item')}`);
      let resDelete = await responseDelete.json();
      console.log(resDelete);
      $('.selected').remove();
      $('.block__chain__container').addClass('d-none');
      $('.loader__page').addClass('d-none');
      $('body').removeClass('ov-hidden');
    } else {
      alert('Debe de seleccionar alguna fila');
    }
  })

  // $('body').on('click', '.name__item,.desc__item,.unid__item,.marca__item', function() {
  //   let prevContext = this.innerHTML.trim();
  //   if(!prevContext.includes('<input')) {
  //     this.innerHTML = `<input class="input__td__article" type="text"><nav class="check__edit"><i class="fas fa-check"></i></nav>`;
  //     this.querySelector('input').value = prevContext;
  //     this.querySelector('input').focus();
  //   }
  // });

  // $('body').on('click', '.stock__item,.precio__item', function() {
  //   let prevContext = this.innerHTML.trim();
  //   if(!prevContext.includes('<input')) {
  //     this.innerHTML = `<input class="input__td__article" type="number"><nav class="check__edit"><i class="fas fa-check"></i></nav>`;
  //     this.querySelector('input').value = prevContext;
  //     this.querySelector('input').focus();
  //   }
  // });

  // $('body').on('blur', '.input__td__article', function() {
  //   this.parentElement.innerHTML = this.value;
  // });

});