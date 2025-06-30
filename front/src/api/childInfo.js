export function childInfo(residentNo) {
  if (!residentNo || residentNo.length < 8) {
    return { age: '-', gender: '-', birthday: '-' };
  }

  const [front6, back7] = residentNo.split('-');
  if (!front6 || !back7) {
    return { age: '-', gender: '-', birthday: '-' };
  }

  const genderCode = back7.charAt(0);

  const year = 2000 + parseInt(front6.slice(0, 2), 10);
  const month = parseInt(front6.slice(2, 4), 10);
  const day = parseInt(front6.slice(4, 6), 10);

  let gender = '-';
  if (genderCode === '3') gender = '남자';
  else if (genderCode === '4') gender = '여자';

  const today = new Date();
  let age = today.getFullYear() - year;
  if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) {
    age--;
  }

  const birthday = `${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;

  return { age, gender, birthday };
}
