import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта ЭКС Групп на почту payment@eks-gr.ru через Яндекс SMTP"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    service = body.get('service', '').strip()
    message = body.get('message', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'Имя и телефон обязательны'}
        }

    smtp_user = 'payment@eks-gr.ru'
    smtp_password = os.environ['SMTP_PASSWORD']

    html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #222; max-width: 600px;">
      <h2 style="color: #7c3aed;">Новая заявка с сайта ЭКС Групп</h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr><td style="padding:8px; font-weight:bold; width:140px;">Имя:</td><td style="padding:8px;">{name}</td></tr>
        <tr style="background:#f5f5f5"><td style="padding:8px; font-weight:bold;">Телефон:</td><td style="padding:8px;">{phone}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Email:</td><td style="padding:8px;">{email or '—'}</td></tr>
        <tr style="background:#f5f5f5"><td style="padding:8px; font-weight:bold;">Услуга:</td><td style="padding:8px;">{service or '—'}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Сообщение:</td><td style="padding:8px;">{message or '—'}</td></tr>
      </table>
      <p style="margin-top:20px; color:#888; font-size:12px;">Заявка отправлена с сайта eks-gr.ru</p>
    </body></html>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка: {name} — {service or "не указана"}'
    msg['From'] = smtp_user
    msg['To'] = smtp_user
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, smtp_user, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {'success': True}
    }