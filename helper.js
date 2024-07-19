exports.success = (message, data) => {
  return { message, data };
};

exports.getUniqueId = (pockemons) => {
  const pockemonsIds = pockemons.map(pockemon => pockemon.id);
  const maxId = pockemonsIds.reduce((a, b) => Math.max(a,b));
  const uniqueId = maxId + 1;
  return uniqueId;
}
