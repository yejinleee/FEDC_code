export default function (req, res) {
  res.status(200).json({
    name: 'he',
    age: 20,
    isValid: true,
  });
}
