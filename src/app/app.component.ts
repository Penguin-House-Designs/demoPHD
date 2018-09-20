import { Component } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ]),
    trigger('loaderAnimate', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate('5s 3s ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])

  ]
})
export class AppComponent {
  title = 'app';
  contactUS = false
  showUS = false
  Thanks = false
  cardNumber: Number;
  newEmail = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: Http) { }

  send(userInfo) {
    var headers = new Headers();
    var eObject = {
      name: userInfo.name,
      email: userInfo.email,
      message: userInfo.message,
      headers: headers
    };
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    console.log('before sendmail')
    return this.http.post('/sendmail', eObject).subscribe()
  }


  newMessage() {
    console.log('add user function')
    this.send(this.newEmail);
  }

  contactAnimation() {
    if (this.contactUS == false) {
      this.contactUS = !this.contactUS
      setTimeout(() => { this.showUS = !this.showUS }, 1000);
    }
    else if (this.contactUS == true) {
      this.showUS = !this.showUS
      setTimeout(() => { this.contactUS = !this.contactUS }, 1000);
    }
  }

  contactAnimation2() {
    this.newMessage()
    this.contactUS = true
    this.showUS = false
    setTimeout(() => { this.Thanks = !this.Thanks }, 1000);
    setTimeout(() => { this.Thanks = !this.Thanks }, 2500);
    setTimeout(() => { this.contactUS = !this.contactUS }, 3500);
    this.newEmail.email = ''
    this.newEmail.message = ''
    this.newEmail.name = ''
  }


  // myStyle: object = {};
  // myParams: object = {};
  width: number = 100;
  height: number = 100;


  myStyle = {
    'position': 'fixed',
    'width': '100%',
    'height': '100%',
    'z-index': -1,
    'top': 0,
    'left': 0,
    'right': 0,
    'bottom': 0,
    'background': '#050a15'
  };

  myParams = {
    "particles": {
      "number": {
        "value": 14,
        "density": {
          "enable": true,
          "value_area": 1025.8919341219544
        }
      },
      "color": {
        "value": "#fff"
      },
      "shape": {
        "type": "edge",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.2683101981549727,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 10,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 441.9226793140727,
        "color": "#142a52",
        "opacity": 0.94463576890600452,
        "width": 0.31565905665290905
      },
      "move": {
        "enable": true,
        "speed": 0.603412060865523,
        "direction": "bottom-right",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": true,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "bubble"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 0.5
          }
        },
        "bubble": {
          "distance": 400,
          "size": 4,
          "duration": 0.3,
          "opacity": 1,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  };



}
