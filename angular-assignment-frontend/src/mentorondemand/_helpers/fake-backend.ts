import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        const users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        const skills: any[] = JSON.parse(localStorage.getItem('skills')) || [];
        const technologies: any[] = JSON.parse(localStorage.getItem('technologies')) || [];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                const filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    const user = filteredUsers[0];
                    const body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token',
                        role: user.role,
                        status: user.status
                    };

                    return of(new HttpResponse({ status: 200, body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // get users
            if (request.url.endsWith('/users') && request.method === 'GET') {
// tslint:disable-next-line: max-line-length
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get user by id
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
// tslint:disable-next-line: max-line-length
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    const urlParts = request.url.split('/');
// tslint:disable-next-line: radix
                    const id = parseInt(urlParts[urlParts.length - 1]);
// tslint:disable-next-line: no-shadowed-variable
                    const matchedUsers = users.filter(user => user.id === id);
                    const user = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // register user
            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                // get new user object from post body
                const newUser = request.body;

                // validation
                const duplicateUser = users.filter(user => user.username === newUser.username).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // delete user
            if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
// tslint:disable-next-line: max-line-length
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    const urlParts = request.url.split('/');
// tslint:disable-next-line: radix
                    const id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        const user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            user.status = user.status === 'active' ? 'in-active' : 'active';
                            users.push(user);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // add skill
            if (request.url.endsWith('/mentor/addskill') && request.method === 'POST') {
                // get new skill object from post body
                const newSkill = request.body;

                // validation
                const duplicateSkill = skills.filter(skill => skill.name === newSkill.name).length;
                if (duplicateSkill) {
                    return throwError({ error: { message: 'skill "' + newSkill.name + '" is already exist' } });
                }

                // save new user
                newSkill.id = skills.length + 1;
                skills.push(newSkill);
                localStorage.setItem('skills', JSON.stringify(skills));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // get skills of mentor
            if (request.url.match(/\/mentor\/skill\/\d+$/) && request.method === 'GET') {
                const skill: any = [];
                // tslint:disable-next-line: max-line-length
                                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                                    // find skill by id in skills array
                                    const urlParts = request.url.split('/');
                // tslint:disable-next-line: radix
                                    const id = parseInt(urlParts[urlParts.length - 1]);
// tslint:disable-next-line: prefer-for-of
                                    for (let i = 0; i < skills.length; i++) {
                                        if (skills[i].mentorId === id) {
                                            skill.push(skills[i]);
                                        }
                                    }
                                    // respond 200 OK
                                    return of(new HttpResponse({ status: 200, body: skill }));
                                } else {
                                    // return 401 not authorised if token is null or invalid
                                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                                }
            }

            // delete mentor skill
            if (request.url.match(/\/mentor\/skill\/\d+$/) && request.method === 'DELETE') {
                // tslint:disable-next-line: max-line-length
                                // check for fake auth token in header and return tech if valid, this security is implemented server side in a real application
                                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                                    // find tech by id in skills array
                                    const urlParts = request.url.split('/');
                // tslint:disable-next-line: radix
                                    const id = parseInt(urlParts[urlParts.length - 1]);
                                    for (let i = 0; i < skills.length; i++) {
                                        const skill = skills[i];
                                        if (skill.mentorId === id) {
                                            // delete tech
                                            skills.splice(i, 1);
                                            localStorage.setItem('skills', JSON.stringify(skills));
                                            break;
                                        }
                                    }
                                    // respond 200 OK
                                    return of(new HttpResponse({ status: 200 }));
                                } else {
                                    // return 401 not authorised if token is null or invalid
                                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                                }
            }

            // add technology
            if (request.url.endsWith('/technologies/create') && request.method === 'POST') {
                // get new technology object from post body
                const newTechnologies = request.body;

                // validation
                const duplicateTech = technologies.filter(tech => tech.name === newTechnologies.name).length;
                if (duplicateTech) {
                    return throwError({ error: { message: 'Technology "' + newTechnologies.name + '" is already exist' } });
                }

                // save new technology
                newTechnologies.id = technologies.length + 1;
                technologies.push(newTechnologies);
                localStorage.setItem('technologies', JSON.stringify(technologies));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // get all technology
            if (request.url.endsWith('/technologies/getAll') && request.method === 'GET') {
                // tslint:disable-next-line: max-line-length
                                // check for fake auth token in header and return tech if valid, this security is implemented server side in a real application
                                // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                                //     return of(new HttpResponse({ status: 200, body: technologies }));
                                // } else {
                                //     // return 401 not authorised if token is null or invalid
                                //     return throwError({ status: 401, error: { message: 'Unauthorised' } });
                                // }
                                return of(new HttpResponse({ status: 200, body: technologies }));
            }

            // delete technology
            if (request.url.match(/\/technologies\/\d+$/) && request.method === 'DELETE') {
                // tslint:disable-next-line: max-line-length
                                // check for fake auth token in header and return tech if valid, this security is implemented server side in a real application
                                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                                    // find tech by id in technologies array
                                    const urlParts = request.url.split('/');
                // tslint:disable-next-line: radix
                                    const id = parseInt(urlParts[urlParts.length - 1]);
                                    for (let i = 0; i < technologies.length; i++) {
                                        const tech = technologies[i];
                                        if (tech.id === id) {
                                            // delete tech
                                            technologies.splice(i, 1);
                                            localStorage.setItem('technologies', JSON.stringify(technologies));
                                            break;
                                        }
                                    }
                                    // respond 200 OK
                                    return of(new HttpResponse({ status: 200 }));
                                } else {
                                    // return 401 not authorised if token is null or invalid
                                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                                }
            }

            // pass through any requests not handled above
            return next.handle(request);

        }))

// tslint:disable-next-line: max-line-length
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
