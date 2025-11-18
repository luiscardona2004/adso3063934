{{-- <x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    {{ __("You're logged in!") }}
                </div>
            </div>
        </div>
    </div>
</x-app-layout> --}}

@extends('layouts.dashboard')
@section('title', 'dashboard ADMIN: Larapets')

@section('content')

    <h1
        class="text-white mt-16 text-5xl font-extrabold tracking-wide flex gap-3 items-center justify-center pb-6 px-8 py-4
       bg-gradient-to-r  to-indigo-00/40 backdrop-blur-xl rounded-2xl shadow-2xl ">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256">
            <path
                d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z">
            </path>
        </svg>
        Dashboard
    </h1>
    <div class="text-white flex flex-wrap gap-4 items-center justify-center ">
        {{-- module user --}}
        <div class="card bg-white/90 w-70 shadow-lg ">
            <figure>
                <img src="images/users.png" alt="Shoes" />
            </figure>
            <div class="card-body bg-[#0008] p-4 rounded-b-lg  ">
                <h2 class="card-title">Module Users</h2>
                <ul class="list bg-[#0005] rounded-box shadow-md">

                    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Stadistics</li>

                    <li class="list-row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fff"
                                viewBox="0 0 256 256">
                                <path
                                    d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <div>Total Users</div>

                        </div>

                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\User::count() }}
                        </button>
                    </li>
                    <li class="list-row ">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fff"
                                viewBox="0 0 256 256">
                                <path
                                    d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <div>Customers</div>

                        </div>

                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\User::count() }}
                        </button>
                    </li>
                    <li class="list-row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fff"
                                viewBox="0 0 256 256">
                                <path
                                    d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <div>Active</div>

                        </div>

                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\User::count() }}
                        </button>
                    </li>

                </ul>
                <div class="card-actions justify-end">
                    <a class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4" href="{{ url('users') }}">Enter
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-4.5 justify-center items-center flex"
                            fill="#fff" viewBox="0 0 256 256">
                            <path
                                d="M237.66,122.34l-96-96A8,8,0,0,0,128,32V72H104a8,8,0,0,0-8,8v96a8,8,0,0,0,8,8h24v40a8,8,0,0,0,13.66,5.66l96-96A8,8,0,0,0,237.66,122.34ZM144,204.69V176a8,8,0,0,0-8-8H112V88h24a8,8,0,0,0,8-8V51.31L220.69,128ZM48,80v96a8,8,0,0,1-16,0V80a8,8,0,0,1,16,0Zm32,0v96a8,8,0,0,1-16,0V80a8,8,0,0,1,16,0Z">
                            </path>
                        </svg>

                    </a>
                </div>
            </div>
        </div>

        {{-- module pets --}}

        <div class="card bg-white/90 w-70 shadow-lg ">
            <figure>
                <img src="images/animals.png" alt="Shoes" />
            </figure>
            <div class="card-body bg-[#0008] p-4 rounded-b-lg  ">
                <h2 class="card-title">Module Users</h2>
                <ul class="list bg-[#0005] rounded-box shadow-md">

                    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Stadistics</li>

                    <li class="list-row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fff"
                                viewBox="0 0 256 256">
                                <path
                                    d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <div>Total Users</div>

                        </div>

                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\User::count() }}
                        </button>
                    </li>
                    <li class="list-row ">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fff"
                                viewBox="0 0 256 256">
                                <path
                                    d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <div>Customers</div>

                        </div>

                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\User::count() }}
                        </button>
                    </li>
                    <li class="list-row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fff"
                                viewBox="0 0 256 256">
                                <path
                                    d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <div>Active</div>

                        </div>

                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\User::count() }}
                        </button>
                    </li>

                </ul>
                <div class="card-actions justify-end">
                    <a class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4" href="{{ url('users') }}">Enter
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-4.5 justify-center items-center flex"
                            fill="#fff" viewBox="0 0 256 256">
                            <path
                                d="M237.66,122.34l-96-96A8,8,0,0,0,128,32V72H104a8,8,0,0,0-8,8v96a8,8,0,0,0,8,8h24v40a8,8,0,0,0,13.66,5.66l96-96A8,8,0,0,0,237.66,122.34ZM144,204.69V176a8,8,0,0,0-8-8H112V88h24a8,8,0,0,0,8-8V51.31L220.69,128ZM48,80v96a8,8,0,0,1-16,0V80a8,8,0,0,1,16,0Zm32,0v96a8,8,0,0,1-16,0V80a8,8,0,0,1,16,0Z">
                            </path>
                        </svg>

                    </a>
                </div>
            </div>
        </div>
        {{-- module adoptions --}}

        <div class="card bg-white/90 w-70 shadow-lg ">
            <figure>
                <img src="images/adoptions.png" alt="Shoes" />
            </figure>
            <div class="card-body bg-[#0008] p-4 rounded-b-lg  ">
                <h2 class="card-title">Module Users</h2>
                <ul class="list bg-[#0005] rounded-box shadow-md">

                    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Stadistics</li>

                    <li class="list-row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fff"
                                viewBox="0 0 256 256">
                                <path
                                    d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <div>Total Users</div>

                        </div>

                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\User::count() }}
                        </button>
                    </li>
                    <li class="list-row ">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fff"
                                viewBox="0 0 256 256">
                                <path
                                    d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <div>Customers</div>

                        </div>

                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\User::count() }}
                        </button>
                    </li>
                    <li class="list-row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fff"
                                viewBox="0 0 256 256">
                                <path
                                    d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <div>Active</div>

                        </div>

                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\User::count() }}
                        </button>
                    </li>

                </ul>
                <div class="card-actions justify-end">
                    <a class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4" href="{{ url('users') }}">Enter
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-4.5 justify-center items-center flex"
                            fill="#fff" viewBox="0 0 256 256">
                            <path
                                d="M237.66,122.34l-96-96A8,8,0,0,0,128,32V72H104a8,8,0,0,0-8,8v96a8,8,0,0,0,8,8h24v40a8,8,0,0,0,13.66,5.66l96-96A8,8,0,0,0,237.66,122.34ZM144,204.69V176a8,8,0,0,0-8-8H112V88h24a8,8,0,0,0,8-8V51.31L220.69,128ZM48,80v96a8,8,0,0,1-16,0V80a8,8,0,0,1,16,0Zm32,0v96a8,8,0,0,1-16,0V80a8,8,0,0,1,16,0Z">
                            </path>
                        </svg>

                    </a>
                </div>
            </div>
        </div>
    </div>
@endsection
