const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Sample Indian patient data
let patients = [
{ id: 'CC1001', patientName: 'Rajesh Kumar', age: 45, gender: 'Male', phone: '+91-98765-43210', department: 'Medical Oncology', doctor: 'Dr. Rahul Sharma', appDate: new Date().toISOString().split('T')[0], appTime: '10:00 AM', symptoms: 'Stage II Lung Cancer', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
{ id: 'CC1002', patientName: 'Sunita Devi', age: 38, gender: 'Female', phone: '+91-87654-32109', department: 'Radiation Oncology', doctor: 'Dr. Amit Kumar', appDate: new Date().toISOString().split('T')[0], appTime: '11:30 AM', symptoms: 'Breast Cancer Radiotherapy', status: 'Confirmed', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { id: 'CC1003', patientName: 'Amit Sharma', age: 52, gender: 'Male', phone: '+91-76543-21098', department: 'Orthopedics', doctor: 'Dr. Amit Sharma', appDate: new Date().toISOString().split('T')[0], appTime: '02:00 PM', symptoms: 'Joint pain', status: 'Checked', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    { id: 'CC1004', patientName: 'Priya Verma', age: 29, gender: 'Female', phone: '+91-65432-10987', department: 'Pediatrics', doctor: 'Dr. Priya Verma', appDate: new Date().toISOString().split('T')[0], appTime: '03:30 PM', symptoms: 'Fever, Cough', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
];

// ROUTES
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/appointment', (req, res) => res.sendFile(path.join(__dirname, 'appointment.html')));
app.get('/doctor', (req, res) => res.sendFile(path.join(__dirname, 'doctor_login.html')));
app.get('/doctors', (req, res) => res.sendFile(path.join(__dirname, 'doctors.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));

// API for patient data
app.get('/api/patients', (req, res) => {
    res.json(patients);
});

// API for today's appointments
app.get('/api/appointments/today', (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const todayPatients = patients.filter(p => p.appDate === today);
    res.json(todayPatients);
});

// Add new patient to today's appointments
app.post('/api/appointments/add', (req, res) => {
    const { patientName, phone, age, gender, department, doctor, appTime, symptoms } = req.body;
    
    const newPatient = {
        id: 'CC' + (patients.length + 1001),
        patientName,
        age: age || '30',
        gender: gender || 'Male',
        phone,
        department,
        doctor: doctor || 'General Physician',
        appDate: new Date().toISOString().split('T')[0],
        appTime: appTime || '10:00 AM',
        symptoms: symptoms || 'General checkup',
        status: 'Pending',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    };
    
    patients.push(newPatient);
    res.json({ success: true, patient: newPatient });
});

// Update patient status
app.post('/api/appointments/update-status', (req, res) => {
    const { id, status } = req.body;
    const patient = patients.find(p => p.id === id);
    if (patient) {
        patient.status = status;
        res.json({ success: true, patient });
    } else {
        res.json({ success: false, message: 'Patient not found' });
    }
});

// BOOK APPOINTMENT - Handles all form fields
app.post('/book', (req, res) => {
    const { patientName, phone, email, age, gender, department, doctor, appDate, appTime, message } = req.body;
    
    const newPatient = {
        id: 'CC' + (patients.length + 1001),
        patientName,
        age: age || '30',
        gender: gender || 'Male',
        email,
        phone,
        department,
        doctor: doctor || 'General Physician',
        appDate,
        appTime,
        symptoms: message || 'General checkup',
        status: 'Pending',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    };
    
    patients.push(newPatient);
    
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Appointment Confirmed | CityCare Hospital</title>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                .card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    padding: 50px;
                    border-radius: 20px;
                    text-align: center;
                    max-width: 500px;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.25);
                }
                .check {
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, #0066cc, #004999);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 40px;
                }
                h1 { color: #1a1a2e; margin-bottom: 20px; }
                .details {
                    background: #f9f9f9;
                    padding: 25px;
                    border-radius: 15px;
                    text-align: left;
                    margin: 20px 0;
                }
                .details p { margin: 12px 0; color: #555; font-size: 14px; }
                .details strong { color: #1a1a2e; }
                a {
                    display: inline-block;
                    padding: 14px 30px;
                    background: linear-gradient(135deg, #0066cc, #004999);
                    color: white;
                    text-decoration: none;
                    border-radius: 10px;
                    margin: 5px;
                    font-weight: 600;
                    transition: all 0.3s;
                }
                a:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0,102,204,0.4);
                }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="check"><i class="fas fa-check"></i></div>
                <h1>Appointment Confirmed!</h1>
                <div class="details">
                    <p><strong>Patient:</strong> ${patientName}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Department:</strong> ${department}</p>
                    <p><strong>Doctor:</strong> ${doctor}</p>
                    <p><strong>Date:</strong> ${appDate} at ${appTime}</p>
                </div>
                <a href="/">Back to Home</a>
                <a href="/appointment">Book Another</a>
            </div>
        </body>
        </html>
    `);
});

// CONTACT
app.post('/contact', (req, res) => {
    const { name, phone, email, department, message } = req.body;
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Message Sent | CityCare Hospital</title>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                    font-family: 'Poppins', sans-serif; 
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); 
                    min-height: 100vh; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    padding: 20px; 
                }
                .card { 
                    background: rgba(255, 255, 255, 0.98); 
                    backdrop-filter: blur(20px);
                    padding: 50px; 
                    border-radius: 25px; 
                    text-align: center; 
                    max-width: 500px;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.3);
                    animation: slideUp 0.5s ease;
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .check-icon {
                    width: 90px;
                    height: 90px;
                    background: linear-gradient(135deg, #25D366, #128C7E);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 25px;
                    box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
                    animation: pop 0.5s ease 0.3s both;
                }
                @keyframes pop {
                    0% { transform: scale(0); }
                    80% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                .check-icon i {
                    font-size: 40px;
                    color: white;
                }
                h1 { 
                    color: #1a1a2e; 
                    margin-bottom: 10px;
                    font-size: 1.8rem;
                }
                .subtitle {
                    color: #64748b;
                    margin-bottom: 25px;
                    font-size: 1rem;
                }
                .details {
                    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
                    padding: 25px;
                    border-radius: 15px;
                    text-align: left;
                    margin-bottom: 25px;
                }
                .details p { 
                    margin: 12px 0; 
                    color: #334155; 
                    font-size: 14px; 
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .details i {
                    color: #3b82f6;
                    width: 20px;
                }
                .details strong { 
                    color: #1a1a2e; 
                    min-width: 80px;
                    display: inline-block;
                }
                .actions {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                a { 
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 14px 28px; 
                    background: linear-gradient(135deg, #3b82f6, #2563eb);
                    color: white; 
                    text-decoration: none; 
                    border-radius: 12px; 
                    font-weight: 600;
                    transition: all 0.3s;
                }
                a:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
                }
                a.secondary {
                    background: #f1f5f9;
                    color: #64748b;
                }
                a.secondary:hover {
                    background: #e2e8f0;
                    box-shadow: none;
                }
                a.whatsapp {
                    background: linear-gradient(135deg, #25D366, #128C7E);
                }
                a.whatsapp:hover {
                    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
                }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="check-icon">
                    <i class="fas fa-check"></i>
                </div>
                <h1>Thank You, ${name}!</h1>
                <p class="subtitle">We received your message successfully.</p>
                
                <div class="details">
                    <p><i class="fas fa-user"></i> <strong>Name:</strong> ${name}</p>
                    <p><i class="fas fa-phone"></i> <strong>Phone:</strong> ${phone}</p>
                    <p><i class="fas fa-envelope"></i> <strong>Email:</strong> ${email}</p>
                    <p><i class="fas fa-stethoscope"></i> <strong>Department:</strong> ${department}</p>
                    <p><i class="fas fa-comment"></i> <strong>Message:</strong> ${message.substring(0, 50)}${message.length > 50 ? '...' : ''}</p>
                </div>
                
                <p style="color: #64748b; margin-bottom: 20px; font-size: 14px;">
                    <i class="fas fa-clock" style="color: #3b82f6;"></i> We'll get back to you within 24 hours
                </p>
                
                <div class="actions">
                    <a href="/"><i class="fas fa-home"></i> Back to Home</a>
                    <a href="https://wa.me/918927811272" target="_blank" class="whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                    <a href="/appointment" class="secondary"><i class="fas fa-calendar-plus"></i> Book Appointment</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

// Enhanced role-based LOGIN
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === 'doctor' && password === '12345') {
        res.redirect('/doctor?role=doctor&loggedIn=true');
    } else if (username === 'receptionist' && password === 'recep123') {
        res.redirect('/receptionist?role=receptionist&loggedIn=true');
    } else {
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Access Denied</title>
                <style>
                    body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, #1a1a2e, #16213e); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
                    .card { background: white; padding: 40px; border-radius: 15px; text-align: center; }
                    a { display: inline-block; padding: 10px 25px; background: #e74c3c; color: white; text-decoration: none; border-radius: 8px; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>Access Denied</h1>
                    <p>Incorrect username or password.</p>
                    <p><small>Doctor: doctor/12345 | Receptionist: receptionist/recep123</small></p>
                    <a href="/doctor">Try Again</a>
                </div>
            </body>
            </html>
        `);
    }
});

// New receptionist route
app.get('/receptionist', (req, res) => res.sendFile(path.join(__dirname, 'receptionist_login.html')));

app.listen(8080, () => console.log('CityCare Cancer Hospital running at http://localhost:8080'));