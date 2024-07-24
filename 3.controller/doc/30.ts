import {of,from} from 'rxjs';


from(Promise.reject('error')).subscribe({
    next: value => console.log(value),
    error: console.error,
    complete: () => console.log('completed')
});