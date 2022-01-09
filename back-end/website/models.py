from . import db


class Url(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    redirect_url = db.Column(db.String(2048), nullable=False)
    alias = db.Column(db.String(10), nullable=False)

    def json(self):
        return {"id": self.id, "redirect_url": self.redirect_url, "alias": self.alias}
