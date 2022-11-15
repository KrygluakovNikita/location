import qr from 'qrcode';

class QRService {
  async createQrCode(link: string) {
    const qrCode = await qr.toDataURL(link);

    return qrCode;
  }
}

export default new QRService();
