function doPost(e) {
  const token = e.parameter.token || e.headers.Authorization?.replace('Bearer ', '');
  const AUTTO_TOKEN = PropertiesService.getScriptProperties().getProperty('WEBHOOK_TOKEN');

  if (!token || token !== AUTTO_TOKEN) {
    return createJsonAnswer({ error: 'Unauthorized' }, 401);
  }

  let request;
  try {
    request = JSON.parse(e.postData.contents);
  } catch (err) {
    return createJsonAnswer({ error: 'Invalid JSON body' }, 400);
  }

  switch (request.service) {
    case 'scriptProjects':
      return handleScriptProjects(request);
    case 'gmail':
      return handleGmail(request); // Assuming this exists
    default:
      return createJsonAnswer({ error: 'Unknown service' }, 400);
  }
}
