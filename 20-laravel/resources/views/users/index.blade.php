@extends('layouts.dashboard')

@section('title', 'Module Users: Larapets')

@section('content')

    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table class="table mt-5">
            <!-- head -->
            <thead>
            <tbody>

                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Document</th>
                    <th>Full Name </th>
                    <th>Email</th>
                    <th>Actions </th>
                </tr>
                </thead>
                @foreach ($users as $user)
                    <tr>
                        <td>{{ $user->id }}</td>
                        <td>{{ $user->document }}</td>
                        <td>{{ $user->fullname }}</td>
                        <td>{{ $user->email }}</td>

                        <td>
                            <a href="">Show</a>
                            <a href="">Edit</a>
                            <a href="">Delete</a>
                        </td>

                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

@endsection
