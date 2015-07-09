set nocompatible
filetype off
set rtp+=~/.vim/bundle/vundle/
call vundle#begin()

" This is the Vundle package, which can be found on GitHub.
" For GitHub repos, you specify plugins using the
" 'user/repository' format
Plugin 'gmarik/vundle'

" We could also add repositories with a ".git" extension
Plugin 'scrooloose/nerdtree.git'

" To get plugins from Vim Scripts, you can reference the plugin
" by name as it appears on the site
Plugin 'Buffergator'

" Emmet"
Plugin 'mattn/emmet-vim'

"Coffeescript"
Plugin 'kchmck/vim-coffee-script'

" Color Schemes"
Plugin 'flazz/vim-colorschemes'

" Match Tag "
Plugin 'MatchTag'

call vundle#end()
" Now we can turn our filetype functionality back on
filetype plugin indent on

"### CUSTOM SETTINGS ###"
syntax on

" Set new "
set smartindent
set tabstop=4
set shiftwidth=4
set expandtab

set pastetoggle=<F2>

let html_no_rendering=1

" color scheme "
colorscheme badwolf

" Show lines"
set number

" Bubbles "
nmap <C-k> ddkP
nmap <C-j> ddp

" Newtab"
map <C-t> :tabnew <Enter>
imap <C-t> <Esc><Esc> :tabnew <Enter>

" Undo"
map <C-z> :u <Enter>
imap <C-z> <Esc><Esc>:u <Enter>

" kk for Esc" 
inoremap kk <esc>

" find"
map <C-f> /

" find/replace"
map <C-g> :%s/

" select all"
map <C-a> GVgg

" Emmet expand"
imap hh <C-y>,

" NerdTree"
map <C-o> :NERDTreeToggle <Enter>

" Window adjust "
map <S-a> :20winc < <Enter>
map <S-d> :20winc > <Enter>

" Window switch "
map <S-k> <C-W>k
map <S-j> <C-W>j
map <S-h> <C-W>h
map <S-l> <C-W>l

" Save file " 
map <S-s> :w <Enter>

" Quit file "
noremap <S-w> :q <Enter> 

" tmp exit vim"
map <S-Space> :sh <Enter>

" Reload .vimrc "
augroup reload_vimrc " {
       autocmd!
       autocmd BufWritePost $MYVIMRC source $MYVIMRC
augroup END "  }       
